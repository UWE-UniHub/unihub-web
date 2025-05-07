import {FC, useEffect, useRef, useState} from "react";
import {Comment, Community, EventCommunity, EventProfile, PostGeneric, Profile} from "../../types/domain.ts";
import {App, Button, Checkbox, Flex, Input} from "antd";
import {isCommunityTarget, isProfileTarget} from "./utils.ts";
import {ProfileAvatar} from "../ProfileAvatar/ProfileAvatar.tsx";
import {CommunityAvatar} from "../CommunityAvatar/CommunityAvatar.tsx";
import {TextAreaRef} from "antd/es/input/TextArea";
import styles from './PostEditor.module.css';
import {SaveOutlined, SendOutlined} from "@ant-design/icons";
import {AddImagePopover} from "./components/AddImagePopover/AddImagePopover.tsx";
import {RcFile} from "antd/es/upload";
import {getBase64Upload} from "../../utils/getBase64Upload.ts";
import {AddEventPopover} from "./components/AddEventPopover/AddEventPopover.tsx";
import {profilesProfileIdPostsPost} from "../../api/profiles/profilesProfileIdPostsPost.ts";
import {communitiesCommunityIdPostsPost} from "../../api/communities/communitiesCommunityIdPostsPost.ts";
import {postsPostIdImgPut} from "../../api/posts/postsPostIdImgPut.ts";
import {EventPreview} from "../EventPreview/EventPreview.tsx";
import {TagsPopover} from "./components/TagsPopover/TagsPopover.tsx";
import { Image } from 'antd';
import {postsPostIdCommentsPost} from "../../api/posts/postsPostIdCommentsPost.ts";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";
import {postsPostIdCommentsCommentIdPatch} from "../../api/posts/postsPostIdCommentsCommentIdPatch.ts";
import {postsPostIdPatch} from "../../api/posts/postsPostIdPatch.ts";
import {getPostImageUrl} from "../../utils/getPostImageUrl.ts";

type Props = {
    target: Community | Profile | string; // string - postId
    edit?: PostGeneric | Comment;
    events: (EventProfile | EventCommunity)[];
    onPost: (content: PostGeneric | Comment) => void;
    onCancel?: VoidFunction;
}

const getMethod = (target: Community | Profile | string, editId?: string) => {
    if(typeof target === 'string') {
        if(editId) return postsPostIdCommentsCommentIdPatch.bind(undefined, target, editId);
        return postsPostIdCommentsPost.bind(undefined, target);
    }
    if(editId) return postsPostIdPatch.bind(undefined, editId);
    if(isProfileTarget(target)) return profilesProfileIdPostsPost.bind(undefined, target.id);
    return communitiesCommunityIdPostsPost.bind(undefined, target.id);
}

export const PostEditor: FC<Props> = ({ target, edit, events, onPost, onCancel }) => {
    const { message } = App.useApp();
    const [focused, setFocused] = useState(false);
    const textareaRef = useRef<TextAreaRef>(null);

    const { profile: ownProfile } = useOwnProfile();

    const isComment = typeof target === 'string';

    const handleFocus = () => {
        setFocused(true);
        setTimeout(() => textareaRef.current?.focus(), 0);
    }

    const [content, setContent] = useState(edit?.content || '');

    const [image, setImage] = useState<RcFile>();
    const [imagePreview, setImagePreview] = useState('');
    const handleImageUpload = (image: RcFile | undefined) => {
        setImage(image);
        if(image) {
            getBase64Upload(image).then(setImagePreview);
        } else {
            setImagePreview('');
        }
    }

    useEffect(() => {
        if(edit && !isComment) {
            const url = getPostImageUrl(edit.id);
            fetch(url).then((r) => {
                if(!r.ok) return Promise.reject();
                return r.blob();
            }).then((b) => {
                setImage({
                    ...b,
                    uid: '-1',
                    lastModifiedDate: new Date(),
                    lastModified: new Date().getTime(),
                    name: 'image.png',
                    webkitRelativePath: ''
                });
                setImagePreview(url);
            })
        }
    }, [edit, isComment]);

    const [eventId, setEventId] = useState<string | undefined>(!isComment ? (edit as PostGeneric)?.event?.id : undefined);
    const [hidden, setHidden] = useState(!isComment ? (edit as PostGeneric)?.hidden || false : false);
    const [tags, setTags] = useState<string | undefined>(!isComment ? (edit as PostGeneric)?.tags || undefined : undefined);

    const handleCancel = () => {
        onCancel?.();
        setFocused(false);
        setContent('');
        setImage(undefined);
        setEventId(undefined);
    }

    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const p = await (getMethod(target, edit?.id))({
                content,
                event_id: eventId || null,
                hidden,
                tags: tags || null
            });

            if(!isComment && image) {
                await postsPostIdImgPut(p.id, image);
            }

            void message.success('Posted');
            onPost(p);
            handleCancel();
        } catch(e) {
            console.error(e);
            void message.error(JSON.stringify(e));
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex align="flex-start" gap={16}>
            {!edit && (
                <>
                    {isProfileTarget(target) && <ProfileAvatar profile={target} version={0} />}
                    {isCommunityTarget(target) && <CommunityAvatar community={target} version={0} />}
                    {isComment && <ProfileAvatar profile={ownProfile!} version={0} />}
                </>
            )}
            {edit || focused ? (
                <div className={styles.textareaContainer}>
                    <Input.TextArea
                        rows={isComment ? 5 : 8}
                        placeholder={isComment ? 'Comment something...' : "Share something..."}
                        ref={textareaRef}
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                    />
                    <Flex vertical gap={8} className={styles.textareaActions}>
                        {imagePreview && (
                            <Image
                                src={imagePreview}
                                alt="preview"
                                className={styles.image}
                                preview={{ mask: null}}
                            />
                        )}
                        {eventId && <EventPreview event={events.find((event) => event.id === eventId)!} />}
                        <Flex align="center" justify="space-between">
                            {!isComment ? (
                                <Flex align="center" gap={8}>
                                    <AddImagePopover image={image} setImage={handleImageUpload} />
                                    <AddEventPopover
                                        events={events}
                                        eventId={eventId}
                                        setEventId={setEventId}
                                    />
                                    <TagsPopover
                                        value={tags}
                                        onChange={setTags}
                                    />
                                    <Checkbox
                                        checked={hidden}
                                        onChange={({ target }) => setHidden(target.checked)}
                                    >Only for subscribers</Checkbox>
                                </Flex>
                            ) : <div />}
                            <Flex align="center" gap={8}>
                                <Button
                                    disabled={loading}
                                    onClick={handleCancel}
                                >Cancel</Button>
                                <Button
                                    loading={loading}
                                    type="primary"
                                    icon={edit ? <SaveOutlined /> : <SendOutlined />}
                                    onClick={handleSubmit}
                                >{edit ? 'Save' : 'Send'}</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </div>
            ) : (
                <Input
                    size="large"
                    variant="filled"
                    placeholder="Share something..."
                    onFocus={handleFocus}
                />
            )}
        </Flex>
    )
}
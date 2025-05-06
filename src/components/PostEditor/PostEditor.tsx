import {FC, useRef, useState} from "react";
import {Community, EventCommunity, EventProfile, Profile} from "../../types/domain.ts";
import {App, Button, Checkbox, Flex, Input} from "antd";
import {isCommunityTarget, isProfileTarget} from "./utils.ts";
import {ProfileAvatar} from "../ProfileAvatar/ProfileAvatar.tsx";
import {CommunityAvatar} from "../CommunityAvatar/CommunityAvatar.tsx";
import {TextAreaRef} from "antd/es/input/TextArea";
import styles from './PostEditor.module.css';
import {SendOutlined} from "@ant-design/icons";
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

type Props = {
    target: Community | Profile | string; // string - postId
    events: (EventProfile | EventCommunity)[];
    onPost: VoidFunction;
}

const getMethod = (target: Community | Profile | string) => {
    if(typeof target === 'string') return postsPostIdCommentsPost;
    if(isProfileTarget(target)) return profilesProfileIdPostsPost;
    return communitiesCommunityIdPostsPost;
}

export const PostEditor: FC<Props> = ({ target, events, onPost }) => {
    const { message } = App.useApp();
    const [focused, setFocused] = useState(false);
    const textareaRef = useRef<TextAreaRef>(null);

    const { profile: ownProfile } = useOwnProfile();

    const isComment = typeof target === 'string';

    const handleFocus = () => {
        setFocused(true);
        setTimeout(() => textareaRef.current?.focus(), 0);
    }

    const [content, setContent] = useState('');

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

    const [eventId, setEventId] = useState<string | undefined>(undefined);
    const [hidden, setHidden] = useState(false);
    const [tags, setTags] = useState<string>();

    const handleCancel = () => {
        setFocused(false);
        setContent('');
        setImage(undefined);
        setEventId(undefined);
    }

    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const p = await (getMethod(target))(isComment ? target : target.id, {
                content,
                event_id: eventId || null,
                hidden,
                tags: tags || null
            });

            if(!isComment && image) {
                await postsPostIdImgPut(p.id, image);
            }

            void message.success('Posted');
            onPost();
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
            {isProfileTarget(target) && <ProfileAvatar profile={target} version={0} />}
            {isCommunityTarget(target) && <CommunityAvatar community={target} version={0} />}
            {isComment && <ProfileAvatar profile={ownProfile!} version={0} />}
            {focused ? (
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
                                    icon={<SendOutlined />}
                                    onClick={handleSubmit}
                                >Send</Button>
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
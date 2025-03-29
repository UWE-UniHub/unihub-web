import {FC, useRef, useState} from "react";
import {Community, EventCommunity, EventProfile, Profile} from "../../types/domain.ts";
import {App, Button, Flex, Input} from "antd";
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
import {EventPreview} from "./components/EventPreview/EventPreview.tsx";
import {profilesProfileIdPostsPost} from "../../api/profiles/profilesProfileIdPostsPost.ts";
import {communitiesCommunityIdPostsPost} from "../../api/communities/communitiesCommunityIdPostsPost.ts";
import {postsPostIdImgPut} from "../../api/posts/postsPostIdImgPut.ts";

type Props = {
    target: Community | Profile;
    events: (EventProfile | EventCommunity)[];
    onPost: VoidFunction;
}

const getTextareaRows = (image: RcFile | undefined, eventId: string | undefined) => {
    let initial = 8;
    if(image) initial += 5;
    if(eventId) initial += 3;
    return initial;
}

export const PostEditor: FC<Props> = ({ target, events, onPost }) => {
    const { message } = App.useApp();
    const [focused, setFocused] = useState(false);
    const textareaRef = useRef<TextAreaRef>(null);

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
            const p = await (isProfileTarget(target) ?
                profilesProfileIdPostsPost :
                communitiesCommunityIdPostsPost
            )(target.id, {
                content,
                event_id: eventId || null
            });

            if(image) {
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
            {focused ? (
                <div className={styles.textareaContainer}>
                    <Input.TextArea
                        rows={getTextareaRows(image, eventId)}
                        placeholder="Share something..."
                        ref={textareaRef}
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                    />
                    <Flex vertical gap={8} className={styles.textareaActions}>
                        {imagePreview && (
                            <img
                                className={styles.image}
                                alt="preview"
                                src={imagePreview}
                            />
                        )}
                        {eventId && <EventPreview event={events.find((event) => event.id === eventId)!} />}
                        <Flex align="center" justify="space-between">
                            <Flex align="center" gap={8}>
                                <AddImagePopover image={image} setImage={handleImageUpload} />
                                <AddEventPopover
                                    events={events}
                                    eventId={eventId}
                                    setEventId={setEventId}
                                />
                            </Flex>
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
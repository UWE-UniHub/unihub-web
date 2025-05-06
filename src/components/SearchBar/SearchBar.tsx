import {FC, useState} from "react";
import {ConfigProvider, Dropdown, Empty, Flex, Input, InputProps, MenuProps, Spin, theme} from "antd";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import styles from './SearchBar.module.css';
import {useSearch} from "../../queries/useSearch.ts";
import {SearchProfileItem} from "./components/SearchProfileItem.tsx";
import {SearchCommunityItem} from "./components/SearchCommunityItem.tsx";
import {SearchPostItem} from "./components/SearchPostItem.tsx";
import {SearchEventItem} from "./components/SearchEventItem.tsx";
import {GroupMoreLabel} from "./components/GroupMoreLabel.tsx";

const LOADING_ITEMS: MenuProps['items'] = [
    {
        key: 'loading',
        label: (
            <Flex justify="center">
                <Spin indicator={<LoadingOutlined spin />} size="small"/>
            </Flex>
        ),
        disabled: true
    }
]

const EMPTY_ITEMS: MenuProps['items'] = [
    {
        key: 'empty',
        label: (
            <Empty />
        ),
        disabled: true
    }
]

export const SearchBar: FC = () => {
    const [value, setValue] = useState('');
    const [{ data }, loading] = useSearch(value);

    const [profilesMore, setProfilesMore] = useState(false);
    const [communitiesMore, setCommunitiesMore] = useState(false);
    const [postsMore, setPostsMore] = useState(false);
    const [eventsMore, setEventsMore] = useState(false);

    const profiles = profilesMore ? data?.profiles : data?.profiles.slice(0, 3);
    const communities = communitiesMore ? data?.communities : data?.communities.slice(0, 3);
    const posts = postsMore ? data?.posts : data?.posts.slice(0, 3);
    const events = eventsMore ? data?.events : data?.events.slice(0, 3);

    const handleChange: InputProps['onChange'] = ({ target }) => {
        setValue(target.value);
        setProfilesMore(false);
        setCommunitiesMore(false);
        setPostsMore(false);
        setEventsMore(false);
    }

    const items: MenuProps['items'] = [
        ...(data?.profiles.length ? [{
            type: 'group',
            label: (
                <GroupMoreLabel
                    label='Profiles'
                    length={data?.profiles.length}
                    more={profilesMore}
                    setMore={setProfilesMore}
                />
            ),
            children: profiles?.map((profile) => ({
                key: profile.id,
                label: <SearchProfileItem profile={profile} />
            }))
        } as const] : []),
        ...(data?.communities.length ? [{
            type: 'group',
            label: (
                <GroupMoreLabel
                    label='Communities'
                    length={data?.communities.length}
                    more={communitiesMore}
                    setMore={setCommunitiesMore}
                />
            ),
            children: communities?.map((community) => ({
                key: community.id,
                label: <SearchCommunityItem community={community} />
            }))
        } as const] : []),
        ...(data?.posts.length ? [{
            type: 'group',
            label: (
                <GroupMoreLabel
                    label='Posts'
                    length={data?.posts.length}
                    more={postsMore}
                    setMore={setPostsMore}
                />
            ),
            children: posts?.map((post) => ({
                key: post.id,
                label: <SearchPostItem post={post} />
            }))
        } as const] : []),
        ...(data?.events.length ? [{
            type: 'group',
            label: (
                <GroupMoreLabel
                    label='Events'
                    length={data?.events.length}
                    more={eventsMore}
                    setMore={setEventsMore}
                />
            ),
            children: events?.map((event) => ({
                key: event.id,
                label: <SearchEventItem event={event} />
            }))
        } as const] : [])
    ];

    const itemsOrEmpty = items.length ? items : EMPTY_ITEMS;

    return (
        <Dropdown
            menu={{ items: loading ? LOADING_ITEMS : itemsOrEmpty, style: { width: '500px' } }}
            open={Boolean(value.length)}
            overlayClassName={styles.dropdown}
        >
            <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                    <Input
                        size="large"
                        variant="borderless"
                        prefix={<SearchOutlined />}
                        className={styles.searchBar}
                        value={value}
                        onChange={handleChange}
                        onBlur={() => setTimeout(() => setValue(''), 100)}
                    />
            </ConfigProvider>
        </Dropdown>
    )
}
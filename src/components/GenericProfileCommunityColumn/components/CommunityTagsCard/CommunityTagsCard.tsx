import {FC} from "react";
import {Community} from "../../../../types/domain.ts";
import {convertInterests} from "../../../../utils/convertInterests.ts";
import styles from './CommunityTagsCard.module.css';
import {Card, Statistic, Tooltip} from "antd";

type Props = {
    community: Community;
}

export const CommunityTagsCard: FC<Props> = ({ community }) => {
    const [shortInterests, moreInterests, fullInterests] = convertInterests(community.tags);

    return (
        <Card
            classNames={{ body: styles.cardItemBody }}
        >
            <Tooltip title={fullInterests.join(', ')}>
                <Statistic
                    title="Tags"
                    value={fullInterests.some(v => v) ? `${shortInterests.join(', ')}${moreInterests ? ` and ${moreInterests} more` : ''}` : 'None'}
                />
            </Tooltip>
        </Card>
    )
}
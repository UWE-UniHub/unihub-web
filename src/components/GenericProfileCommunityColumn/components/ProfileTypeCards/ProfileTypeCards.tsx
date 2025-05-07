import {FC} from "react";
import {Card, Flex, Statistic, Tooltip} from "antd";
import {Profile} from "../../../../types/domain.ts";
import styles from './ProfileTypeCards.module.css';
import {nthNumber} from "../../../../utils/nthNumber.ts";
import {convertInterests} from "../../../../utils/convertInterests.ts";
import dayjs from "dayjs";

type Props = {
    profile: Profile;
}

export const ProfileTypeCards: FC<Props> = ({ profile }) => {
    const [shortInterests, moreInterests, fullInterests] = convertInterests(profile.interests);

    if(profile.is_staff) {
        return (
            <Flex vertical gap={4}>
                <Card
                    className={styles.cardItem}
                    classNames={{ body: styles.cardItemBody }}
                >
                    <Statistic
                        title="Date of Birth"
                        value={dayjs(profile.date_of_birth).format('DDD MMMM YYYY')}
                    />
                </Card>
                <Flex gap={4}>
                    <Card
                        className={styles.cardItem}
                        classNames={{ body: styles.cardItemBody }}
                    >
                        <Statistic
                            title="Position"
                            value={profile.staff?.position}
                        />
                    </Card>
                    <Card
                        className={styles.cardItem}
                        classNames={{ body: styles.cardItemBody }}
                    >
                        <Statistic
                            title="Department"
                            value={profile.staff?.department}
                        />
                    </Card>
                </Flex>
                <Card
                    className={styles.cardItem}
                    classNames={{ body: styles.cardItemBody }}
                >
                    <Tooltip title={fullInterests.join(', ')}>
                        <Statistic
                            title="Interests"
                            value={fullInterests.some(v => v) ? `${shortInterests.join(', ')}${moreInterests ? ` and ${moreInterests} more` : ''}` : 'None'}
                        />
                    </Tooltip>
                </Card>
            </Flex>
        )
    }

    return (
        <Flex vertical gap={4}>
            <Card
                className={styles.cardItem}
                classNames={{ body: styles.cardItemBody }}
            >
                <Statistic
                    title="Date of Birth"
                    value={profile.date_of_birth ? dayjs(profile.date_of_birth).format('DD MMMM YYYY') : '-'}
                />
            </Card>
            <Flex gap={4}>
                <Card
                    className={styles.cardItem}
                    classNames={{ body: styles.cardItemBody }}
                >
                    <Statistic
                        title="Year"
                        value={profile.student?.year ? `${profile.student.year}${nthNumber(profile.student.year)}` : '-'}
                    />
                </Card>
                <Card
                    className={styles.cardItem}
                    classNames={{ body: styles.cardItemBody }}
                >
                    <Statistic
                        title="Program"
                        value={profile.student?.program}
                    />
                </Card>
            </Flex>
            <Card
                className={styles.cardItem}
                classNames={{ body: styles.cardItemBody }}
            >
                <Statistic
                    title="School"
                    value={profile.student?.school}
                />
            </Card>
            <Card
                className={styles.cardItem}
                classNames={{ body: styles.cardItemBody }}
            >
                <Tooltip title={fullInterests.join(', ')}>
                    <Statistic
                        title="Interests"
                        value={fullInterests.some(v => v) ? `${shortInterests.join(', ')}${moreInterests ? ` and ${moreInterests} more` : ''}` : 'None'}
                    />
                </Tooltip>
            </Card>
        </Flex>
    )
}
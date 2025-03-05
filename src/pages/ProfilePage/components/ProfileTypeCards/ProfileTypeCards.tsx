import {FC} from "react";
import {Card, Flex, Statistic} from "antd";
import {Profile} from "../../../../types/domain.ts";
import styles from './ProfileTypeCards.module.css';

type Props = {
    profile: Profile;
}

export const ProfileTypeCards: FC<Props> = ({ profile }) => {
    if(profile.is_staff) {
        return (
            <Flex gap={16}>
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
        )
    }

    return (
        <Flex vertical>
            <Flex>
                <Card
                    className={styles.cardItem}
                    classNames={{ body: styles.cardItemBody }}
                >
                    <Statistic
                        title="Level"
                        value={profile.student?.level}
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
        </Flex>
    )
}
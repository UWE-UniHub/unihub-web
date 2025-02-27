import {FC} from "react";
import {Segmented, SegmentedProps} from "antd";

type Props = {
    value?: boolean;
    onChange?: (value: boolean) => void;
}

const SEGMENTED_OPTIONS: SegmentedProps['options'] = [
    { label: 'Student', value: 'student' },
    { label: 'Staff', value: 'staff' }
]

export const ProfileTypeSegmented: FC<Props> = ({ value, onChange }) => (
    <Segmented
        options={SEGMENTED_OPTIONS}
        value={value ? 'staff' : 'student'}
        onChange={(value) => onChange?.(value === 'staff')}
    />
)
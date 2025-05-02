import {FC} from "react";
import {Select, SelectProps} from "antd";
import {INTERESTS} from "./constants.ts";

export const InterestTagsSelect: FC<SelectProps> = ({ value, onChange, ...rest }) => (
    <Select
        {...rest}
        mode="tags"
        value={value?.split(',')}
        onChange={(v) => onChange?.(v?.join(','))}
        options={INTERESTS}
        placeholder="Select or add your own..."
    />
)
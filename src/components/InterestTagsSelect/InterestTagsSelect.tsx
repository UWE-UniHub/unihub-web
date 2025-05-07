import {FC} from "react";
import {Select, SelectProps} from "antd";
import {INTERESTS} from "./constants.ts";

export const InterestTagsSelect: FC<SelectProps> = ({ value, onChange, ...rest }) => (
    <Select
        {...rest}
        mode="tags"
        value={(value as string | undefined)?.split(',').filter(v => v)}
        onChange={(v) => onChange?.((v as string[] | undefined)?.filter(v => v).join(','))}
        options={INTERESTS}
        placeholder="Select or add your own..."
    />
)
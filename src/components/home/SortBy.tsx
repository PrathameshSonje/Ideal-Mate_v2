import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface InputProps {
    handleChange: (keyword: string) => void
}

export const SortBy = ({ handleChange }: InputProps) => {
    return (
        <Select onValueChange={(value) => {
            handleChange(value)
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sort By</SelectLabel>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export const dateValueConverter = {
    convert: v => v ? new Date(v) : null,
    convertBack: v => v && !isNaN(v) ? v.toISOString().split("T")[0] : ""
};

export const numberValueConverter = {
    convert: v => v ? Number(v) : 0,
    convertBack: v => v ? String(v) : "0"
};
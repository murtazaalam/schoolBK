const applySearchFilter = (query, searchText, fields) => {
    if (!searchText || fields.length === 0) return query;

    const searchFilter = {
        $or: fields.map((field) => ({ [field]: { $regex: searchText, $options: "i" } })),
    };

    return { ...query, ...searchFilter };
}

const applySorting = (sort, order) => {
    const sortOrder = (order === "desc" ? -1 : 1);
    return { [sort]: sortOrder };
}

const applyPagination = (page, limit) => {
    const skip = (page - 1) * limit;
    return { skip, limit: Number(limit) };
}

module.exports = {
    applySorting,
    applyPagination,
    applySearchFilter,
};

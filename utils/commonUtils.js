
function applySearchFilter(query, search, fields) {
    if (!search || fields.length === 0) return query;

    const searchFilter = {
        $or: fields.map((field) => ({ [field]: { $regex: search, $options: "i" } })),
    };

    return { ...query, ...searchFilter };
}


function applySorting(sort, order) {
    const sortOrder = order === "desc" ? -1 : 1;
    return { [sort]: sortOrder };
}


function applyPagination(page, limit) {
    const skip = (page - 1) * limit;
    return { skip, limit: Number(limit) };
}

module.exports = {
    applySearchFilter,
    applySorting,
    applyPagination,
};

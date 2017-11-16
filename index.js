function permissionsBinarySearch(item, items) {
    var start = 0;
    var end = items.length - 1;
    while (start <= end) {
        const mid = parseInt((start + end) / 2, 10);
        if (items[mid] === item || item.startsWith(items[mid])) {
            return true;
        }
        if (item > items[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return false;
}

module.exports = function isUserAuthorized(prefix, requiredPermissions, loggedInUser) {
    if (!requiredPermissions.length) {
        return true;
    }
    const requiredPermissionsMapped = requiredPermissions.map(function (permission) {
        return  prefix ? prefix + permission : permission;
    });
    if (loggedInUser) {
        const permissions = loggedInUser.permissions.sort();
        for (var i = 0; i < requiredPermissionsMapped.length; i += 1) {
            const permission = requiredPermissionsMapped[i];
            if (permissionsBinarySearch(permission, permissions)) {
                return true;
            }
        }
    }
    return false;
}

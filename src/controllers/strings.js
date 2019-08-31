export const generateId = () => {
    const time_stamp = new Date().getTime().toString();
    const len = time_stamp.length;
    return time_stamp.substring(len-4);
};

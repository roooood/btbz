export const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export function clone(arr) {
    let newObj = (arr instanceof Array) ? [] : {};
    for (let i in arr) {
        if (arr[i] && typeof arr[i] == "object") {
            newObj[i] = this.clone(arr[i]);
        }
        else
            newObj[i] = arr[i]
    }
    return newObj;
}

export function toMoney(amount) {
    if (typeof amount == 'undefined' || amount == null)
        return '0';
    if (amount.length < 3)
        return amount + '';
    return ("" + amount).replace(/,/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

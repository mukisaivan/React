async function apiRequest(url = "", optionsObj = null, errMsg = null) {
    try {
        const res = fetch(url, optionsObj);
        if(!(await res).ok) throw Error("Please reload the app")
    } catch (error) {
        errMsg = error.message;
    } finally {
        return errMsg;
    }
    
}



export default apiRequest;
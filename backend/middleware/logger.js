const logger = (req, res, next) => {
    const today = new Date();

    const date = `${today.getYear()} - ${today.getMonth} - ${today.getDate()} : ${today.getHours()}: ${today.getMinutes}: ${today.getSeconds}`;
    console.log(today, req.method, req.url);
    next();
    };


export default logger;
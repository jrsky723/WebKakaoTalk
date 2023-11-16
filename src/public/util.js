const formatDate = (date)=>{
    let month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줍니다)
    let day = date.getDate(); // 일
    let hours = date.getHours(); // 시
    let minutes = date.getMinutes(); // 분

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${month}/${day} ${hours}:${minutes}`;
}

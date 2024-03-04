export const getAPIStatus =  async() => {
    const res = await fetch('http://localhost:3001/api');
    return res.status;
}
// generate random date in the format YYYY-MM-DD
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

for (let i = 1; i <= 20; i++) {
    console.log(`"testuser${i}","testuser${i}","test@user${i}.com","${randomDate(new Date(2023, 1, 1), new Date(2023, 12, 31)).toISOString().split('T')[0]}","[""did that"", ""did this""]"`);
}
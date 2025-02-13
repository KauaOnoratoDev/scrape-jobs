import pkg from 'xlsx';


const { writeFileXLSX, utils } = pkg;

export async function writeExcel(jobs) {
    const worksheet = utils.json_to_sheet(jobs);
    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, 'Vagas');
    writeFileXLSX(workbook, 'uploads/vagas.xlsx');
}
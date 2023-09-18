import { export_json_to_excel } from './Export2Excel';
//引入Expor2tExcel.js里的方法
/**
 *  @function 表格导出Excel文件
 *  @param option {Object}
 *  tableData: 表格数据
 *  header: 表头数据
 *  fileName: 导出文件名
 *  dataMap: 数据映射处理
 *  merges: 合并单元格
 */
// 使用示例
// const header = [
//     { title: "姓名", dataIndex: "name" },
//     { title: "职位", dataIndex: "position" },
//     { title: "工种", dataIndex: "type" },
//     { title: "工号", dataIndex: "num" },
//     { title: "是否实名认证", dataIndex: "true_name" },
//     { title: "是否绑定工资卡", dataIndex: "money_card" },
//     { title: "是否签订劳动合同", dataIndex: "contract" },
//     { title: "是否同意规章制度", dataIndex: "system" },
//     { title: "是否购买保险合同", dataIndex: "insure" },
//     { title: "是否同意技术规范", dataIndex: "specification" },
//   ];
//   exportExcel({
//     tableData: this.tableData,
//     header: header,
//     fileName: "员工信息表.xlsx",
//   });
const exportExcel = async ({ tableData, header, fileName, dataMap = {}, merges = [], } = {}) => {
    const headerKey = [] // 需要导出数据的字段索引
    const tHeader = header.map(item => {
        headerKey.push(item.dataIndex)
        return item.title
    })
    // headerKey里面包含的是搜索的属性
    const exportData = [] // 导出数据 二维数组
    tableData.forEach(item => {
        const record = [] // 行数据
        headerKey.forEach(key => {
            const cellData = item[key] // 需要导出的单元格数据
            if (dataMap[key]) {
                record.push(dataMap[key][cellData])
            } else {
                record.push(cellData)
            }
        })
        exportData.push(record)
    })
    await export_json_to_excel({
        header: tHeader,
        data: exportData,
        filename: fileName,
        merges,
    })
}
export default exportExcel

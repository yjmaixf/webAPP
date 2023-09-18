<template>
  <div class="container">
    <div class="flex_container">
      <el-table
        :data="tableData"
        border
        :fit="true"
        size="small"
        class="left"
        ref="multipleTableRef"
        highlight-current-row
        @select="select"
        @select-all="selectAll"
        @row-click="coloeSelect"
      >
        <el-table-column type="selection" width="35px" />
        <el-table-column prop="ip_phone" min-width="110px" label="手机IP">
          <template #default="scope">
            <p style="white-space: nowrap">{{ scope.row.ip_phone }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="编号" />
        <el-table-column prop="progress" label="进度">
          <template #default="scope">
            <p style="white-space: nowrap">
              {{ scope.row.progress ? scope.row.progress : "0" }}/{{
                scope.row.progress2 ? scope.row.progress2 : "0"
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="success" label="成功">
          <template #default="scope">
            <p class="center">
              {{ scope.row.success ? scope.row.success : "0" }}/{{
                scope.row.success2 ? scope.row.success2 : "0"
              }}
            </p>
          </template>
        </el-table-column>

        <el-table-column prop="failure" label="失败">
          <template #default="scope">
            <p class="center">
              {{ scope.row.failure ? scope.row.failure : "0" }}/{{
                scope.row.failure2 ? scope.row.failure2 : "0"
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="次数">
          <template #default="scope">
            <p class="center">
              {{ scope.row.count ? scope.row.count : "0" }}/{{
                scope.row.count2 ? scope.row.count2 : "0"
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金币">
          <template #default="scope">
            <p class="center">
              {{ scope.row.money ? scope.row.money : "0" }}/{{
                scope.row.account2_money ? scope.row.account2_money : "0"
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="earnings" label="收益">
          <template #default="scope">
            <p class="center">
              {{ scope.row.earnings ? scope.row.earnings : "0" }}/{{
                scope.row.earnings2 ? scope.row.earnings2 : "0"
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="养号时间">
          <template #default="scope">
            <span v-if="scope.row.time"
              >{{ scope.row.time / 3600000 }}小时</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="time2" label="金币时间">
          <template #default="scope">
            <span v-if="scope.row.time2"
              >{{ scope.row.time2 / 3600000 }}小时</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="time3" label="换号等待">
          <template #default="scope">
            <span v-if="scope.row.time2">{{ scope.row.time3 / 3600 }}小时</span>
          </template>
        </el-table-column>
        <el-table-column prop="livepeople" label="人数" />
        <el-table-column prop="can_boxcoin" label="数量" />
        <el-table-column prop="boxcoin" label="宝箱" />
        <el-table-column prop="message" label="状态">
          <template #default="scope">
            <span
              v-if="
                isTimestampDifferenceGreaterThanMinutes(scope.row.lastTime, 10)
              "
              >工作</span
            >
            <span style="color: red" v-else> 异常 </span>
          </template>
        </el-table-column>
        <el-table-column prop="thistask" label="当前任务">
          <template #default="scope">
            <span v-if="scope.row.thistask == '视频养号'">养号</span>
            <span v-else-if="scope.row.thistask == '抢金币'">GOLD</span>
            <span v-else-if="scope.row.thistask == '等待'">等待</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="当前信息" min-width="160px">
          <template #default="scope">
            <span v-if="scope.row.state">{{ scope.row.state }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="runTime" label="运行时长" min-width="110px">
          <template #default="scope">
            <span v-if="scope.row.runTime">{{
              formatTime(scope.row.runTime, scope.row.thistask)
            }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="resetting_time" min-width="110px" label="重置">
          <template #default="scope">
            <span v-if="scope.row.resetting_time == '已重置'">已重置</span>
            <span v-else-if="scope.row.resetting_time">{{
              getFormatDate(scope.row.resetting_time)
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="height: 260px; min-height: 260px">
      <div class="right">
        <div class="flex">
          <div>
            <div class="list">
              <span>启动延时：</span>
              <el-input
                v-model="configuration.schedule_input"
                style="width: 150px"
                placeholder=""
              />
              <span>&nbsp;秒</span>
            </div>
            <div class="list width_100">
              <el-checkbox
                v-model="configuration.automatically_run_scripts"
                label="自动运行脚本"
                size="large"
              />
            </div>
            <div class="list width_100">
              <el-checkbox
                v-model="configuration.agent"
                label="跳过代理检测"
                size="large"
              />
            </div>
            <div class="list width_100">
              <el-checkbox
                v-model="configuration.High_probability"
                label="高命中率才抢"
                size="large"
              />
            </div>
            <!-- <div class="list">
              <el-form-item label="重置时间：" style="margin-bottom: 0px">
                <el-input
                  placeholder="请输入整数"
                  type="number"
                  v-model="form2.resetting_time"
                />
              </el-form-item>
            </div> -->
            <div
              class="list"
              v-if="configuration.time && configuration.time != '已重置'"
            >
              <div class="list_item_flex">
                <span>
                  重置时间 {{ getFormatDate(configuration.time) }}&nbsp;点
                </span>
              </div>
            </div>
          </div>
          <div>
            <div class="list">
              <span>代理切换：</span>
              <el-select
                v-model="configuration.vpn"
                style="width: 150px"
                class="m-2"
                placeholder=""
              >
                <el-option
                  v-for="item in vpn_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div>
            <div class="list">
              <span>语言切换：</span>
              <el-select
                v-model="configuration.language"
                style="width: 150px"
                class="m-2"
                placeholder=""
              >
                <el-option
                  v-for="item in language_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="list btn_box">
          <div>
            <el-button
              @click="upload = true"
              style="width: 220px; margin-left: 8px"
              type="primary"
              size="medium "
              >参数设置</el-button
            >
            <el-button
              @click="addCont = true"
              style="width: 220px"
              type="primary"
              size="medium "
              >设备编号</el-button
            >
            <el-button
              @click="dialogVisible = true"
              style="width: 220px"
              type="primary"
              size="medium "
              >删除账号</el-button
            >
          </div>

          <div>
            <el-button
              style="width: 220px; margin-left: 12px"
              @click="start()"
              type="primary"
              size="medium "
              >开始脚本</el-button
            >
            <el-button
              style="width: 220px"
              type="danger"
              size="medium "
              @click="resetting_time = true"
              >定时重置</el-button
            >
            <el-button
              style="width: 220px"
              type="danger"
              size="medium "
              @click="setting()"
              >重置全部</el-button
            >
          </div>
        </div>
      </div>
      <footer>
        <div class="list">
          <div class="item">
            <span class="label">在线设备: </span
            ><span>{{ accountSuccess() }}</span>
          </div>
          <div class="item">
            <span class="label">GOLD总数: </span
            ><span>{{ totalEarnings }}</span>
          </div>
          <div class="item">
            <span class="label">今日累计GOLD: </span
            ><span>{{ tady_earnings }}</span>
          </div>
          <div class="item">
            <!-- {{ uniqueId }} -->
            <span class="label">脚本运行时间: </span><span>--</span>
          </div>
        </div>
      </footer>
    </div>
    <el-dialog v-model="addCont" draggable width="500px" title="设备编号">
      <div v-loading="loading" element-loading-text="正在导入">
        <el-form :model="form" label-width="80px">
          <el-form-item label="设备编号">
            <el-input placeholder="请输入编号：" v-model="form.number" />
          </el-form-item>
          <el-form-item label="电脑ip：">
            <el-input placeholder="请输入电脑ip" v-model="form.ipaddress" />
          </el-form-item>
          <el-form-item label="手机ip：">
            <el-input placeholder="请输入电脑ip" v-model="form.ip_phone" />
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-upload
            :auto-upload="false"
            :on-change="uploadChange"
            :show-file-list="false"
          >
            <el-button type="primary">导入编号</el-button>
          </el-upload>
          <el-button style="margin-left: 20px" @click="addCont = false"
            >取消</el-button
          >
          <el-button type="primary" @click="sumitAdd()"> 确定 </el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog v-model="upload" draggable width="500px" title="参数设置">
      <el-form :model="form2" label-width="120px">
        <el-form-item label="养号时间：">
          <el-input
            placeholder="请输入养号时间（单位：小时）"
            type="number"
            v-model="form2.time"
          />
        </el-form-item>
        <el-form-item label="抢金币时间：">
          <el-input
            placeholder="请输入抢金币时间（单位：小时）"
            type="number"
            v-model="form2.time2"
          />
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input
            placeholder="请输入等待时间（单位：小时）"
            type="number"
            v-model="form2.time3"
          />
        </el-form-item>
        <!-- <el-form-item label="重置时间：">
          <el-input
            placeholder="请输入整数"
            type="number"
            v-model="form2.resetting_time"
          />
        </el-form-item> -->

        <el-form-item label="累计成功换号：">
          <el-input
            placeholder="请输入不为0的数字"
            type="number"
            v-model="form2.continuous_success_change_number"
          />
        </el-form-item>
        <el-form-item label="连续失败换号：">
          <el-input
            placeholder="请输入不为0的数字"
            type="number"
            v-model="form2.continuous_err_change_number"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="upload = false">取消</el-button>
          <el-button type="primary" @click="sumituplod()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible" title="删除" width="30%">
      <span>确定删除？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="delectAddCont()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="resetting_time"
      draggable
      title="定时重置"
      width="400px"
    >
      <el-form :model="form2" label-width="100px">
        <el-form-item label="重置时间：">
          <el-input
            v-model="form2.resetting_time"
            style="width: 100%"
            placeholder=""
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetting_time = false">取消</el-button>
          <el-button type="primary" @click="dataSetting()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script >
import { reactive, toRefs, onMounted, ref, nextTick } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
const { ipcRenderer } = require("electron"); // 直接使用 require  ,
import * as xlsx from "xlsx";
const { app } = require("electron");
// const fs = require("fs");
// const path = require("path");
export default {
  name: "indexVue",
  setup() {
    const multipleTableRef = ref(null);
    const multipleSelection = ref([]);
    // ipcRenderer.send("message");

    // 获取用户数据目录路径
    // const userDataPath = app.getPath("userData");
    console.log(app);
    const state = reactive({
      uniqueId: "", //电脑设备唯一id
      resetting_time: false,
      currentRow: [],
      loading: false,
      dialogVisible: false,
      totalEarnings: "",
      tady_earnings: "",
      form: {
        number: "",
        ipaddress: "",
        ip_phone: "",
      },
      form2: {
        time: "", //养号时间
        time2: "", //抢金币时间
        time3: "", //等待时间
        continuous_err_change_number: "",
        continuous_success_change_number: "",
        resetting_time: "",
      },
      addCont: false, //添加账号
      upload: false, //修改
      // multipleSelection: [],
      // 选中列
      selectData: "",
      tableData: [],
      chockboxData: [],
      language_options: [
        {
          value: "英文",
          label: "英文",
        },
      ],
      vpn_options: [
        {
          value: "KIT",
          label: "KIT",
        },
      ],
      options: [
        {
          value: "一条龙服务",
          label: "一条龙服务",
        },
        {
          value: "二条龙服务",
          label: "二条龙服务",
        },
        {
          value: "三条龙服务",
          label: "三条龙服务",
        },
        {
          value: "四条龙服务",
          label: "四条龙服务",
        },
      ],
      model: [
        {
          value: "三星S10",
          label: "三星S10",
        },
        {
          value: "RedmiK40",
          label: "RedmiK40",
        },
      ],
      configuration_option: [
        {
          value: "默认配置",
          label: "默认配置",
        },
        {
          value: "111111",
          label: "111111",
        },
        {
          value: "222222",
          label: "222222",
        },
      ],
      configuration: {
        vpn: "KIT",
        language: "英文",
        configuration_input: 10,
        schedule_input: 10,
        automatically_run_scripts: true,
        at_regular_time: true,
        time: 21,
        function_value: "一条龙服务",
        model_value: "三星S10",
        agent: false,
        circulate: true,
        High_probability: false,
        change_number: 60,
        tunnelling: 2.5,
        nursing_account: 0.3,
        inadequate: 30,
        success_quate: 40,
        configuration_value: "默认配置",
      },
    });
    //获取当前系统时间方法 格式只保留 时：分
    const getNowFormatDate = () => {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getHours() + ":" + date.getMinutes();
      return currentdate;
    };

    //将时间戳转为日期
    const getFormatDate = (timestamp) => {
      // 创建一个Date对象，传入时间戳（秒级别）
      var date = new Date(timestamp * 1000); // 将秒转换为毫秒

      // 使用Date对象的方法获取年、月、日、时、分、秒等信息
      // var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1，并确保两位数字
      var day = ("0" + date.getDate()).slice(-2);
      var hours = ("0" + date.getHours()).slice(-2);
      var minutes = ("0" + date.getMinutes()).slice(-2);

      // 构建日期字符串
      // var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
      var formattedDate = `${month}-${day}:${hours}:${minutes}`;

      return formattedDate;
    };
    // 添加账号
    const sumitAdd = () => {
      const dataToSend = {
        number: state.form.number, // 替换为您要发送的 number 参数值
        ipaddress: state.form.ipaddress, // 替换为您要发送的 ipaddress 参数值
        ip_phone: state.form.ip_phone,
        uniqueId: state.uniqueId,
        state: 0,
      };
      // 发送 POST 请求，并将数据发送给服务器
      axios
        .post(
          "http://206.119.179.105/public/index.php/index/index/insertData",
          dataToSend
        )
        .then(function (res) {
          if (res.data.code == 200) {
            ElMessage({
              message: "添加成功",
              type: "success",
            });
          } else {
            ElMessage({
              message: res.data.message,
              type: "error",
            });
          }
        });
      state.addCont = false;
    };
    // 修改参数
    const sumituplod = () => {
      // console.log(state.selectData);
      let pattern = /^,|,$/g; // 匹配字符串开头或结尾的逗号的正则表达式
      let dataArr = state.selectData.replace(pattern, ""); // 使用replace方法去除匹配的逗号
      let numArr = dataArr.split(",");
      let from = {
        time: state.form2.time * 3600000,
        time2: state.form2.time2 * 3600000,
        time3: state.form2.time3 * 3600,
        continuous_err_change_number: state.form2.continuous_err_change_number,
        continuous_success_change_number:
          state.form2.continuous_success_change_number,
        resetting_time: getTimestampForHour(state.form2.resetting_time),
      };
      axios
        .post(
          "http://206.119.179.105/public/index.php/index/index/updateAccounts",
          { numArr, from }
        )
        .then(function (res) {
          ElMessage({
            message: res.data.message,
            type: "success",
          });
          state.upload = false;
        });
    };
    const coloeSelect = (val) => {
      if (state.currentRow.length == 0) {
        let arr = [];
        arr.push(val);
        state.currentRow = arr;
        console.log(state.currentRow);
      } else {
        state.currentRow.forEach((item) => {
          if (item.number == val.number) {
            state.currentRow = [];
            console.log(state.currentRow);
          }
        });
      }
    };

    const select = (val) => {
      state.chockboxData = val;
      let numbers = "";
      val.forEach((item) => {
        numbers += "," + item.number;
      });
      state.selectData = numbers;
    };
    const selectAll = (val) => {
      state.chockboxData = val;
      let numbers = "";
      val.forEach((item) => {
        numbers += "," + item.number;
      });
      state.selectData = numbers;
    };
    const delectAddCont = () => {
      let pattern = /^,|,$/g; // 匹配字符串开头或结尾的逗号的正则表达式
      let dataArr = state.selectData.replace(pattern, ""); // 使用replace方法去除匹配的逗号
      let numArr = dataArr.split(",");
      // console.log(numArr);
      axios
        .post(
          "http://206.119.179.105/public/index.php/index/index/delectAccounts",
          { numArr }
        )
        .then(function (res) {
          if (res.data.error_code == 200) {
            ElMessage({
              message: "删除成功",
              type: "success",
            });
            state.dialogVisible = false;
          }
        });
    };
    const start = () => {
      console.log("启动程序");
      // 在Vue组件中触发事件，通知主进程启动桌面程序
      // ipcRenderer.send("message");
    };
    //  归轮询获取表格数据
    const getData = () => {
      // uniqueId=16950243814170.gghy8v1hi8r ${state.uniqueId}
      axios
        .get(
          `http://206.119.179.105/public/index.php/index/index/queryData?uniqueId=${state.uniqueId}`
        )
        .then(function (res) {
          if (res.data.code == 200) {
            state.totalEarnings = res.data.totalEarnings;
            state.tady_earnings = res.data.tady_earnings;
            state.tableData = res.data.data;
            state.configuration.time = state.tableData[0].resetting_time;
            state.tableData.sort((a, b) => {
              // 提取数字部分并进行比较
              const extractNumber = (str) => {
                const match = str.match(/\d+/);
                return match ? parseInt(match[0]) : -1;
              };
              const numA = extractNumber(a.number);
              const numB = extractNumber(b.number);

              return numA - numB;
            });
            let NewArr = [];
            let NEWColor = [];
            state.chockboxData.forEach((item) => {
              const foundItem = state.tableData.find(
                (tableItem) => tableItem.number === item.number
              );
              if (foundItem) {
                NewArr.push(foundItem);
              }
            });
            if (state.currentRow.length > 0) {
              state.currentRow.forEach((item) => {
                let colorSelect = state.tableData.find(
                  (tableItem) => tableItem.number === item.number
                );
                if (colorSelect) {
                  NEWColor.push(colorSelect);
                }
              });
            }

            nextTick(() => {
              NewArr.forEach((item) => {
                // console.log(item);
                multipleTableRef.value.toggleRowSelection(item, undefined);
              });
              // console.log(NEWColor[0]);
              multipleTableRef.value.setCurrentRow(NEWColor[0]);
            });

            setTimeout(() => {
              getData();
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);

          setTimeout(() => {
            getData();
          }, 3000);
        });
    };

    //表头数据切换
    const changeTableHead = (
      tableData = [
        { number: "a6", ipaddress: "127.0.0.1" },
        { number: "a7", ipaddress: "127.0.0.1" },
      ],
      fieldName = {
        number: "number",
        ipaddress: "ipaddress",
        ip_phone: "ip_phone",
      }
    ) => {
      const list = tableData.map((item) => {
        const obj = {};
        for (const k in item) {
          if (fieldName[k]) {
            obj[fieldName[k]] = item[k];
          }
        }
        return obj;
      });
      return list;
    };

    const readFile = (file) => {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (ev) => {
          resolve(ev.target?.result);
        };
      });
    };

    const uploadChange = async (file) => {
      let dataBinary = await readFile(file.raw);
      let workBook = xlsx.read(dataBinary, { type: "binary", cellDates: true });
      let workSheet = workBook.Sheets[workBook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(workSheet);

      let excelData = changeTableHead(data, {
        编号: "number",
        ip: "ipaddress",
        手机ip: "ip_phone",
      });
      // 使用 Promise.all 处理多个异步请求
      try {
        state.loading = true;
        await Promise.all(
          excelData.map(async (item) => {
            item.uniqueId = state.uniqueId;
            await axios.post(
              "http://206.119.179.105/public/index.php/index/index/insertData",
              item
            );
          })
        );

        state.addCont = false;
        ElMessage({
          message: `导入成功`,
          type: "success",
        });
      } catch (error) {
        console.error("导入失败", error);
        ElMessage({
          message: `导入失败`,
          type: "error",
        });
      } finally {
        state.loading = false;
      }
    };
    // 将秒转换为00:00:00格式时间
    const formatTime = (milliseconds) => {
      // console.log(type);
      // 将毫秒转换为秒
      const seconds = Math.floor(milliseconds / 1000);
      // 计算小时、分钟和剩余的秒数
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      // 格式化为 "00:00:00" 格式
      const formattedTime =
        ("0" + hours).slice(-2) +
        ":" +
        ("0" + minutes).slice(-2) +
        ":" +
        ("0" + remainingSeconds).slice(-2);

      return formattedTime;
    };
    // 判断账号异常还是正常工作
    const isTimestampDifferenceGreaterThanMinutes = (timestamp, minutes) => {
      // 获取当前时间戳（以秒为单位）
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // 计算时间差（以秒为单位）
      const timeDifference = currentTimestamp - timestamp;
      // 计算分钟数
      const minutesDifference = timeDifference / 60;
      // 判断时间差是否大于指定分钟数
      if (minutesDifference > minutes) {
        return 0;
      } else {
        return 1;
      }
    };
    // 将输入的时间转换为时间戳
    const convertToTimestamp = (inputTime) => {
      // 获取当前日期
      const currentDate = new Date();

      // 解析输入的时间字符串，如果没有提供分钟，默认设置为 0
      const parts = inputTime.split(":");
      const hour = parseInt(parts[0]);
      const minute = parts.length > 1 ? parseInt(parts[1]) : 0;

      // 使用当前日期的年、月和日，以及输入的小时和分钟，创建一个新的日期对象
      const targetDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hour,
        minute
      );
      // 获取目标日期的时间戳（以毫秒为单位）
      const timestamp = targetDate.getTime();
      return timestamp;
    };

    //  计算多少账号在正常工作
    const accountSuccess = () => {
      let num = 0;
      state.tableData.forEach((item) => {
        if (isTimestampDifferenceGreaterThanMinutes(item.lastTime, 10)) {
          num++;
        }
      });
      setTimeout(() => {
        accountSuccess();
      }, 10000);
      return num;
    };

    // 直接输入点数，获取对应今天这个点数的时间戳
    const getTimestampForHour = (hour) => {
      // 获取当前日期对象
      var currentDate = new Date();
      // 设置当前日期的小时数
      currentDate.setHours(hour, 0, 0, 0);
      // 获取当前日期的时间戳（毫秒级）
      var timestamp = currentDate.getTime();
      var thisDay = new Date().getTime();
      // 将时间戳转换为秒级
      var timestampInSeconds = Math.floor(timestamp / 1000);

      if (timestamp < thisDay) {
        // timestampInSeconds=0;
        // 获得timestampInSeconds时间戳的24小时之后的时间戳
        timestampInSeconds = timestampInSeconds + 86400;
        return timestampInSeconds;
      } else {
        return timestampInSeconds;
      }
    };
    // 定时重置
    const dataSetting = () => {
      let pattern = /^,|,$/g; // 匹配字符串开头或结尾的逗号的正则表达式
      let dataArr = state.selectData.replace(pattern, ""); // 使用replace方法去除匹配的逗号
      let numArr = dataArr.split(",");
      let from = {
        time: "",
        time2: "",
        time3: "",
        continuous_err_change_number: "",
        continuous_success_change_number: "",
        resetting_time: getTimestampForHour(state.form2.resetting_time),
      };
      axios
        .post(
          "http://206.119.179.105/public/index.php/index/index/updateAccounts",
          { numArr, from }
        )
        .then(function (res) {
          ElMessage({
            message: res.data.message,
            type: "success",
          });
          state.resetting_time = false;
        });
    };
    // 立即重置
    const setting = () => {
      let pattern = /^,|,$/g; // 匹配字符串开头或结尾的逗号的正则表达式
      let dataArr = state.selectData.replace(pattern, ""); // 使用replace方法去除匹配的逗号
      let numArr = dataArr.split(",");
      let time_num = new Date().getTime();
      let from = {
        time: "",
        time2: "",
        time3: "",
        continuous_err_change_number: "",
        continuous_success_change_number: "",
        resetting_time: Math.floor(time_num / 1000),
      };
      axios
        .post(
          "http://206.119.179.105/public/index.php/index/index/updateAccounts",
          { numArr, from }
        )
        .then(function (res) {
          ElMessage({
            message: res.data.message,
            type: "success",
          });
          state.upload = false;
        });
    };
    onMounted(() => {
      ipcRenderer.on("unique-id", (event, uniqueId) => {
        console.log(event);
        state.uniqueId = uniqueId;
      });
      getData();
    });
    return {
      ...toRefs(state),
      // handleSelectionChange,
      // getSummaries,
      // openAddCont,
      sumitAdd,
      onMounted,
      getData,
      sumituplod,
      getNowFormatDate,
      delectAddCont,
      start,
      readFile,
      uploadChange,
      changeTableHead,
      formatTime,
      multipleTableRef,
      multipleSelection,
      select,
      isTimestampDifferenceGreaterThanMinutes,
      selectAll,
      convertToTimestamp,
      accountSuccess,
      // handleCurrentChange,
      // setCurrent,
      coloeSelect,
      getTimestampForHour,
      getFormatDate,
      dataSetting,
      setting,
      // saveDataToUserData,
      // loadDataFromUserData,
      // 其他返回的数据...
    };
  },
};
</script>
<style scoped>
.container {
  min-height: 740px;
  height: 100%;
  max-height: 100%;
  min-width: 1660px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.background_pictur {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  /* opacity: 0.7; */
}
.background_pictur img {
  width: 120%;
  height: 120%;
  position: absolute;
  left: -100px;
  top: -100px;
}
footer {
  height: 40px;
  min-height: 40px;
  z-index: 1;
  background: #fff;
  /* opacity: 0.9; */
}
footer .list {
  display: flex;
  width: 100%;
  min-width: 1660px;
  height: 100%;
  justify-content: space-evenly;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
footer .list .item {
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  font-weight: 700;
}
footer .list .item .label {
  margin-right: 5px;
}
.flex_container {
  width: 100%;
  /* height: 100%; */
  height: calc(100% - 260px);
  z-index: 1;
  background: #fff;
  /* opacity: 0.9; */
}
.el-table {
  height: 100%;
}
.el-select {
  width: 150px;
}
.el-input-number,
.el-input,
.el-select {
  height: 26px;
}

.list {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 20px;
  text-align: center;
  justify-content: flex-start;
  font-size: 12px;
}
.min_width .list {
  width: 170px;
}
.list_item_flex {
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 14px;
}
.el-checkbox.el-checkbox--large {
  height: 20px !important;
}
.left {
  width: 100%;
  /* height: 676px; */
  font-weight: 500;
  color: #000;
  /* opacity: 0.9; */
}
.flex {
  display: flex;
  margin-top: 24px;
  height: 100px;
  flex-direction: column;
}
.flex > div {
  display: flex;
  margin-bottom: 24px;
}
.right {
  display: flex;
  justify-content: space-between;
  /* opacity: 0.9; */
  padding: 0 8px;
  height: 200px;
  background: #fff;
}
.btn_box {
  display: flex;
  width: 500px;
  height: 222px;
}
.btn_box button {
  margin: 5px;
  font-size: 20px;
  height: 43px;
  font-weight: 600;
}
.el-table__body tr.current-row > td.el-table__cell {
  background-color: #000;
}
.flex .list {
  width: 230px;
}
.flex .el-input__wrapper {
  max-width: 100px;
}
.btn_box button {
  margin: 4px !important;
  height: 40px !important;
}
.width_100 {
  width: 100px !important;
}
/* .center{
  text-align: center;
} */
</style>

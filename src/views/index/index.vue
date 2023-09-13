<template>
  <div class="container">
    <!-- <div class="background_pictur">
      <img src="../../../public/icons/background.jpg" />
    </div> -->

    <div class="flex_container">
      <!-- <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button> -->
      <el-table
        :data="tableData"
        border
        :fit="true"
        class="left"
        @selection-change="handleSelectionChange"
      >
        <!-- time: state.form2.time * 3600000,
        time2: state.form2.time2 * 3600000,
        time3: state.form2.time3 * 3600, -->
        <el-table-column type="selection" width="55px" />
        <el-table-column prop="ipaddress" label="IP">
          <template #default="scope">
            <p style="white-space: nowrap">{{ scope.row.ipaddress }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="编号" />
        <el-table-column prop="progress" label="进度" />
        <el-table-column prop="success" label="成功" />
        <el-table-column prop="failure" label="失败" />
        <el-table-column prop="count" label="次数" />
        <el-table-column prop="box_species" label="金币" />
        <el-table-column prop="earnings" label="收益" />
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
        <el-table-column prop="" label="数量" />
        <el-table-column prop="boxcoin" label="宝箱" />
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <span v-if="scope.row.state == 0">--</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="thistask" label="当前任务">
          <template #default="scope">
            <span v-if="scope.row.thistask == '视频养号'">养号</span>
            <span v-else-if="scope.row.thistask == '抢金币'">GOLD</span>
            <span v-else>等待</span>
          </template>
        </el-table-column>
        <el-table-column prop="message" label="当前信息" />
        <el-table-column prop="runTime" label="运行时长" min-width="110px" />
        <el-table-column prop="resetting" label="重置" />
      </el-table>
    </div>
    <div>
      <div class="right">
        <div class="flex">
          <div class="list">
            <span>启动延时：</span>
            <el-input
              v-model="configuration.schedule_input"
              style="width: 150px"
              placeholder=""
            />
            <span>&nbsp;秒</span>
          </div>
          <div class="list">
            <el-checkbox
              v-model="configuration.automatically_run_scripts"
              label="自动运行脚本"
              size="large"
            />
          </div>
          <div class="list">
            <el-checkbox
              v-model="configuration.at_regular_time"
              label="重置时间"
              size="large"
            />
            <div class="list_item_flex">
              <el-input style="width: 60px" v-model="configuration.time" />
              <!-- {{getNowFormatDate()}} -->
              <span>&nbsp;点</span>
            </div>
          </div>
          <div class="list">
            <span>语言：</span>
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
          <div class="list">
            <span>代理：</span>
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
          <div class="list">
            <el-checkbox
              v-model="configuration.agent"
              label="跳过代理检测"
              size="large"
            />
          </div>
          <div class="list">
            <el-checkbox
              v-model="configuration.circulate"
              label="开启循环跑号"
              size="large"
            />
          </div>
          <div class="list">
            <el-checkbox
              v-model="configuration.High_probability"
              label="高命中率才抢"
              size="large"
            />
          </div>
        </div>
        <div class="list btn_box">
          <el-button
            @click="upload = true"
            style="width: 220px; margin-left: 12px"
            type="primary"
            >参数设置</el-button
          >
          <el-button @click="openAddCont()" style="width: 220px" type="primary"
            >设备编号</el-button
          >
          <el-button
            @click="dialogVisible = true"
            style="width: 220px"
            type="primary"
            >删除账号</el-button
          >
          <el-button
            style="width: 220px; margin-left: 12px"
            @click="start()"
            type="primary"
            >开始脚本</el-button
          >
          <el-button style="width: 220px" type="danger">重置全部</el-button>
        </div>
      </div>
      <footer>
        <div class="list">
          <div class="item">
            <span class="label">在线设备: </span><span>--</span>
          </div>
          <div class="item">
            <span class="label">GOLD总数: </span><span>--</span>
          </div>
          <div class="item">
            <span class="label">今日累计GOLD: </span><span>--</span>
          </div>
          <div class="item">
            <span class="label">脚本运行时间: </span><span>--</span>
          </div>
        </div>
      </footer>
    </div>
    <el-dialog v-model="addCont" title="设备编号">
      <el-form :model="form" label-width="120px">
        <el-form-item label="设备编号">
          <el-input placeholder="请输入编号：" v-model="form.number" />
        </el-form-item>
        <el-form-item label="ip：">
          <el-input placeholder="请输入ip" v-model="form.ipaddress" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCont = false">取消</el-button>
          <el-button type="primary" @click="sumitAdd()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="upload" title="参数设置">
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
        <el-form-item label="连续成功换号：">
          <el-input
            placeholder="请输入不为0的数字"
            type="number"
            v-model="form2.continuous_err_change_number"
          />
        </el-form-item>
        <el-form-item label="连续失败换号：">
          <el-input
            placeholder="请输入不为0的数字"
            type="number"
            v-model="form2.continuous_success_change_number"
          />
        </el-form-item>

        <!-- 连续不中：
抢中次数： -->
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="upload = false">取消</el-button>
          <el-button type="primary" @click="sumituplod()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible"
      title="删除"
      width="30%"
      :before-close="handleClose"
    >
      <span>确定删除？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="delectAddCont()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script >
import { reactive, toRefs, onMounted } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
const { ipcRenderer } = require("electron"); // 直接使用 require
export default {
  name: "indexVue",
  setup() {
    const state = reactive({
      dialogVisible: false,
      form: {
        number: "",
        ipaddress: "",
      },
      form2: {
        time: "", //养号时间
        time2: "", //抢金币时间
        time3: "", //等待时间
        continuous_err_change_number: "",
        continuous_success_change_number: "",
      },
      isSelect: true,
      addCont: false, //添加账号
      upload: false, //修改
      multipleSelection: [],
      // 选中列
      selectData: "",
      tableData: [],
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
        ip_input: "192.168.3.118",
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
    //获取当前系统时间方法 格式只保留 时：分

    // 添加账号
    const sumitAdd = () => {
      const dataToSend = {
        number: state.form.number, // 替换为您要发送的 number 参数值
        ipaddress: state.form.ipaddress, // 替换为您要发送的 ipaddress 参数值
        state: 0,
      };
      // 发送 POST 请求，并将数据发送给服务器
      axios
        .post(
          "http://206.119.179.105/public/index.php/index/index/insertData",
          dataToSend
        )
        .then(function (res) {
          if (res.data.error_code == 200) {
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
      (state.isSelect = true), (state.addCont = false);
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
      };
      axios
        .post(
          "http://206.119.179.105/public/index.php/index/index/updateAccounts",
          { numArr, from }
        )
        .then(function (res) {
          // getData();
          ElMessage({
            message: res.data.message,
            type: "success",
          });
          (state.isSelect = true), (state.upload = false);
        });
    };
    const handleSelectionChange = (val) => {
      // state.multipleSelection = val;
      var numbers = "";
      val.forEach((item) => {
        numbers += "," + item.number;
      });
      state.selectData = numbers;
      console.log(state.selectData);
      if (numbers == "") {
        state.isSelect = true;
      } else {
        state.isSelect = false;
      }
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
            state.isSelect = true;
            state.dialogVisible = false;
          }
        });
    };
    const start = () => {
      // 在Vue组件中触发事件，通知主进程启动桌面程序
      // window.myApi.sendMsg("message");
      ipcRenderer.send("message");
    };
    //  归轮询获取表格数据
    const getData = () => {
      axios
        .get("http://206.119.179.105/public/index.php/index/index/queryData")
        .then(function (res) {
          if (res.data.code == 200) {
            if (state.isSelect) {
              state.tableData = res.data.data;
            }
            setTimeout(() => {
              getData();
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    onMounted(() => {
      getData();
    });
    return {
      ...toRefs(state),
      handleSelectionChange,
      // getSummaries,
      // openAddCont,
      sumitAdd,
      onMounted,
      getData,
      sumituplod,
      getNowFormatDate,
      delectAddCont,
      start,
      // 其他返回的数据...
    };
  },
};
</script>
<style scoped>
.container {
  min-height: 740px;
  height: 100%;
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
  height: 100%;
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
}
.el-checkbox.el-checkbox--large {
  height: 20px !important;
}
.left {
  width: 100%;
  height: 676px;
  /* opacity: 0.9; */
}
.flex {
  display: flex;
  margin-top: 24px;
  height: 100px;
  flex-wrap: wrap;
}
.right {
  display: flex;
  justify-content: space-between;
  /* opacity: 0.9; */
  padding: 0 8px;
  height: 220px;
  background: #fff;
}
.btn_box {
  display: flex;
  width: 230px;
  height: 126px;
  flex-direction: column;
}
.btn_box button {
  margin-top: 8px;
}
</style>

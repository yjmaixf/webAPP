<template>
  <div class="container">
    <div class="background_pictur">
      <img src="../../../public/icons/background.jpg" />
    </div>
    <div class="flex_container">
      <div style="width: 100%">
        <el-table
          :data="tableData"
          border
          :summary-method="getSummaries"
          show-summary
          class="left"
        >
          <el-table-column type="selection" width="58" />
          <el-table-column prop="ip" label="IP" :width="maxWidth ? 110 : 110" />
          <el-table-column prop="id" label="ID" :width="maxWidth ? '' : 30" />
          <el-table-column
            prop="schedule"
            label="进度"
            :width="maxWidth ? '' : 60"
          />
          <el-table-column
            prop="success"
            label="成功"
            :width="maxWidth ? '' : 80"
          />
          <el-table-column
            prop="fail"
            label="失败"
            :width="maxWidth ? '' : 80"
          />
          <el-table-column
            prop="number"
            label="次数"
            :width="isWidth ? 100 : 80"
          />
          <el-table-column
            prop="money"
            label="金币"
            :width="maxWidth ? '' : 80"
          />
          <el-table-column
            prop="income"
            label="收益"
            :width="maxWidth ? '' : 60"
          />
          <el-table-column
            prop="cumulativeGain"
            label="累计收益"
            :width="maxWidth ? '' : 80"
          />
          <el-table-column
            prop="peopleNum"
            label="人数"
            :width="maxWidth ? '' : 60"
          />
          <el-table-column
            prop="num"
            label="数量"
            :width="maxWidth ? '' : 60"
          />
          <el-table-column
            prop="box"
            label="宝藏"
            :width="maxWidth ? '' : 60"
          />
          <el-table-column
            prop="status"
            label="状态"
            :width="maxWidth ? '' : 60"
          />
          <el-table-column
            prop="task"
            label="当前任务"
            :width="maxWidth ? '' : 80"
          />
          <el-table-column prop="isMessage" label="当前信息" width="110" />
          <el-table-column prop="runTime" label="运行时长" width="110" />
          <el-table-column
            prop="resetting"
            label="重置"
            :width="maxWidth ? '' : 60"
          />
        </el-table>
      </div>
      <div class="right">
        <div class="list">
          <span>多开数量：</span>
          <el-input-number
            v-model="configuration.configuration_input"
            :min="1"
            :max="10"
          />
        </div>
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
            label="定时重置"
            size="large"
          />
          <div class="list_item_flex">
            <span>启动延时：</span>
            <el-input
              v-model="configuration.time"
              style="width: 50px"
              placeholder=""
            />
            <span>&nbsp;秒</span>
          </div>
        </div>
        <div class="list">
          <span>功能：</span>
          <el-select
            v-model="configuration.function_value"
            style="width: 150px"
            class="m-2"
            placeholder=""
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="list">
          <span>机型：</span>
          <el-select
            v-model="configuration.model_value"
            class="m-2"
            placeholder=""
          >
            <el-option
              v-for="item in model"
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
        <div class="list">
          <span>换号静默：</span>
          <el-input
            v-model="configuration.change_number"
            style="width: 60px"
            placeholder=""
          />
          <span>&nbsp;分钟</span>
        </div>
        <div class="list">
          <span>掘金时间：</span>
          <el-input
            v-model="configuration.tunnelling"
            style="width: 60px"
            placeholder=""
          />
          <span>&nbsp;小时</span>
        </div>
        <div class="list">
          <span>养号时间：</span>
          <el-input
            v-model="configuration.nursing_account"
            style="width: 60px"
            placeholder=""
          />
          <span>&nbsp;小时</span>
        </div>
        <div class="list">
          <span>连续不中：</span>
          <el-input
            v-model="configuration.inadequate"
            style="width: 60px"
            placeholder=""
          />
          <span>&nbsp;次换号</span>
        </div>
        <div class="list">
          <span>抢中次数：</span>
          <el-input
            v-model="configuration.success_quate"
            style="width: 60px"
            placeholder=""
          />
          <span>&nbsp;次下线</span>
        </div>
        <div class="list">
          <span>服务器IP：</span>
          <el-input
            v-model="configuration.ip_input"
            style="width: 150px"
            placeholder=""
          />
        </div>
        <div class="list">
          <el-button style="width: 220px" type="primary"
            >更新图片资源</el-button
          >
        </div>
        <div class="list">
          <el-button style="width: 220px" type="danger">重置全部</el-button>
        </div>
        <el-divider> 脚本控制 </el-divider>
        <div class="list">
          <el-button style="width: 220px" type="danger">停止脚本</el-button>
        </div>
        <div class="list">
          <el-button style="width: 220px" type="danger">全部暂停</el-button>
        </div>
        <el-divider> 保存配置 </el-divider>
        <div class="list">
          <span>当前配置：</span>
          <el-select
            v-model="configuration.configuration_value"
            class="m-2"
            placeholder=""
          >
            <el-option
              v-for="item in configuration_option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="list" style="margin-top: 10px !important">
          <el-button style="width: 220px" type="primary">保存配置</el-button>
        </div>
      </div>
    </div>
    <footer>
      <div class="list">
        <div class="item">
          <span class="label">当前版本: </span><span>202303212021</span>
        </div>
        <div class="item">
          <span class="label">到期时间: </span><span>2026-07-05 13:19:04</span>
        </div>
        <div class="item">
          <span class="label">卡密多开数量: </span><span>20</span>
        </div>
        <div class="item">
          <span class="label">在线设备: </span><span>5</span>
        </div>
        <div class="item">
          <span class="label">金币总数: </span><span>444</span>
        </div>
        <div class="item">
          <span class="label">今日总收益: </span><span>{{ isWidth }}</span>
        </div>
        <div class="item">
          <span class="label">脚本已运行: </span><span>12:21:12</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from "vue";
export default {
  name: "indexVue",
  setup() {
    const state = reactive({
      isWidth: window.innerWidth,
      maxWidth: "",
      multipleSelection: [],
      tableData: [
        {
          ip: "19.0168.0.101",
          id: "1",
          schedule: "2/4",
          success: "3/2/987",
          fail: "12/10/55",
          number: "12/66/87",
          money: "66/55/8754",
          income: 90,
          cumulativeGain: 180,
          peopleNum: 221,
          num: 124,
          box: 656,
          status: "工作",
          task: "掘金",
          isMessage: "执行养号流程",
          runTime: "0小时13分钟8秒",
          resetting: "已重置",
        },
        {
          ip: "19.0168.0.101",
          id: "1",
          schedule: "2/4",
          success: "3/2/987",
          fail: "12/10/55",
          number: "12/66/87",
          money: "66/55/8754",
          income: 90,
          cumulativeGain: 180,
          peopleNum: 221,
          num: 124,
          box: 656,
          status: "工作",
          task: "掘金",
          isMessage: "执行养号流程",
          runTime: "0小时13分钟8秒",
          resetting: "已重置",
        },
        {
          ip: "19.0168.0.101",
          id: "1",
          schedule: "2/4",
          success: "3/2/987",
          fail: "12/10/55",
          number: "12/66/87",
          money: "66/55/8754",
          income: 90,
          cumulativeGain: 180,
          peopleNum: 221,
          num: 124,
          box: 656,
          status: "工作",
          task: "掘金",
          isMessage: "执行养号流程",
          runTime: "0小时13分钟8秒",
          resetting: "已重置",
        },
        {
          ip: "19.0168.0.101",
          id: "1",
          schedule: "2/4",
          success: "3/2/987",
          fail: "12/10/55",
          number: "12/66/87",
          money: "66/55/8754",
          income: 90,
          cumulativeGain: 180,
          peopleNum: 221,
          num: 124,
          box: 656,
          status: "工作",
          task: "掘金",
          isMessage: "执行养号流程",
          runTime: "0小时13分钟8秒",
          resetting: "已重置",
        },
        {
          ip: "19.0168.0.101",
          id: "1",
          schedule: "2/4",
          success: "3/2/987",
          fail: "12/10/55",
          number: "12/66/87",
          money: "66/55/8754",
          income: 90,
          cumulativeGain: 180,
          peopleNum: 221,
          num: 124,
          box: 656,
          status: "工作",
          task: "掘金",
          isMessage: "执行养号流程",
          runTime: "0小时13分钟8秒",
          resetting: "已重置",
        },
        {
          ip: "19.0168.0.101",
          id: "1",
          schedule: "2/4",
          success: "3/2/987",
          fail: "12/10/55",
          number: "12/66/87",
          money: "66/55/8754",
          income: 90,
          cumulativeGain: 180,
          peopleNum: 221,
          num: 124,
          box: 656,
          status: "工作",
          task: "掘金",
          isMessage: "执行养号流程",
          runTime: "0小时13分钟8秒",
          resetting: "已重置",
        },
        {
          ip: "19.0168.0.101",
          id: "1",
          schedule: "2/4",
          success: "3/2/987",
          fail: "12/10/55",
          number: "12/66/87",
          money: "66/55/8754",
          income: 90,
          cumulativeGain: 180,
          peopleNum: 221,
          num: 124,
          box: 656,
          status: "工作",
          task: "掘金",
          isMessage: "执行养号流程",
          runTime: "0小时13分钟8秒",
          resetting: "已重置",
        },
        {
          ip: "19.0168.0.101",
          id: "1",
          schedule: "2/4",
          success: "3/2/987",
          fail: "12/10/55",
          number: "12/66/87",
          money: "66/55/8754",
          income: 90,
          cumulativeGain: 180,
          peopleNum: 221,
          num: 124,
          box: 656,
          status: "工作",
          task: "掘金",
          isMessage: "执行养号流程",
          runTime: "0小时13分钟8秒",
          resetting: "已重置",
        },
        {
          ip: "19.0168.0.101",
          id: "1",
          schedule: "2/4",
          success: "3/2/987",
          fail: "12/10/55",
          number: "12/66/87",
          money: "66/55/8754",
          income: 90,
          cumulativeGain: 180,
          peopleNum: 221,
          num: 124,
          box: 656,
          status: "工作",
          task: "掘金",
          isMessage: "执行养号流程",
          runTime: "0小时13分钟8秒",
          resetting: "已重置",
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

    onMounted(() => {
      window.onresize = () => {
        return (() => {
          state.isWidth = window.innerWidth;
        })();
      };
    });
    // 监听state.counter的变化
    watch(
      () => state.isWidth,
      (newValue) => {
        if (newValue > 1661) {
          if (state.maxWidth == false) {
            state.maxWidth = true;
          }
        } else {
          if (state.maxWidth) {
            state.maxWidth = false;
          }
        }
      }
    );
    const handleSelectionChange = (val) => {
      state.multipleSelection = val;
    };
    const getSummaries = (param) => {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "计算";
          return;
        }
        data.map((item) => {
          if (index == 8) {
            sums[index] += item.income;
          }
        });

        const values = data.map((item) => Number(item[column.property]));
        if (
          !values.every((value) => isNaN(value)) ||
          (index != 8 && index != 9)
        ) {
          if (index == 8 || index == 9) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          }
          if (index == 8 || index == 9) {
            sums[index] += " 元";
          }
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    };
    return {
      ...toRefs(state),
      handleSelectionChange,
      getSummaries,
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
  opacity: 0.7;
}
.background_pictur img{
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
  opacity: 0.9;
}
footer .list {
  display: flex;
  width: 100%;
  min-width: 1660px;
  height: 100%;
  justify-content: space-between;
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
  display: flex;
  z-index: 1;
  background: #fff;
  opacity: 0.9;
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
  width: 263px;
  text-align: center;
  justify-content: flex-start;
  margin: 2px auto;
  font-size: 12px;
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
  height: 720px;
  opacity: 0.9;
}
.right {
  min-width: 300px;
  width: 300px;
  height: 720px;
  max-height: 100%;
  background-color: #fff;
  margin-left: 20px;
  border: solid 1px #e2e2e2;
  border-bottom: none;
  border-top: none;
  opacity: 0.9;
}
@media screen and (min-width: 1661px) {
  .left {
    min-width: 1295px;
    min-height: 720px;
    width: 100% !important;
    height: 100% !important;
  }
  .right {
    min-width: 300px;
    max-width: 300px;
    min-height: 720px;
    width: 100% !important;
    height: 100% !important;
  }
  .container {
    min-height: 740px;
    height: 100% !important;
  }
}
</style>

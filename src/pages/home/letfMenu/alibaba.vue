<template>
  <el-table :data="v.tableData" border>
    <el-table-column
      v-for="item in v.columns"
      :key="item.label"
      :prop="item.label"
      :label="item.label"
    ></el-table-column>
    <el-table-column label="option">
      <template #default="scope"
        ><el-button type="primary" @click="editUser(scope)">edit</el-button
        ><el-button type="danger">delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" @click="getUsers">getUsers</el-button>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import userService from '@/utils/services/userService';

const v = reactive({
  tableData: [],
  columns: [
    { label: '_id' },
    { label: 'create_time' },
    { label: 'isDel' },
    { label: 'username' },
    { label: 'password' },
  ],
});

onMounted(() => {
  // getUsers();
});

const getUsers = async () => {
  const { data, status, statusText } = await userService.findUser({
    name: 'nana',
  });
  v.tableData = data.users;
};
const editUser = async (val) => {
  console.log(val.row._id);
};
</script>

<style scoped></style>

<template>
  <div>
    <ul v-if="menu.length">
      <li v-for="item in menu" :key="item.id">
        {{ item.name }}
        <ul v-if="item.children">
          <li v-for="child in item.children" :key="child.id">{{ child.name }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { login, fetchMenu } from '@/services/api';

export default {
  data() {
    return {
      menu: []
    };
  },
  async created() {
    const token = await login();
    if (token) {
      this.menu = await fetchMenu(token);
    }
  }
};
</script>

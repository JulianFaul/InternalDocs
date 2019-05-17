<template>
  <header class='header'>
    <div class='content-container'>
      <v-icon class='header__toolbar-icon' @click.stop="drawer = !drawer">menu</v-icon>
      <div class='header__content'>
        <router-link to='/' class='header__title'>
          <img src='../../assets/ndteclogowhite.png'>
        </router-link>
         <h3>Central Hub</h3>
      </div>
    </div>
<v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list>
      <v-list-tile to="/">
        <v-list-tile-action >
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>
      <v-list-group prepend-icon="account_circle" no-action>
        <template v-slot:activator>
          <v-list-tile to="/admin">
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile v-for="(adminPage, i) in adminPages" :key="i"  :to="adminPage.url">
            <v-list-tile-title v-text="adminPage.text"></v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-list-group prepend-icon="developer_board" no-action>
        <template v-slot:activator>
          <v-list-tile to="/data">
            <v-list-tile-title>Data</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile v-for="(dataPage, i) in dataPages" :key="i"  :to="dataPage.url">
            <v-list-tile-title v-text="dataPage.text"></v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-list-group prepend-icon="computer" no-action>
        <template v-slot:activator>
          <v-list-tile to="/data">
            <v-list-tile-title>Dev</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile v-for="(devPage, i) in devPages" :key="i"  :to="devPage.url">
            <v-list-tile-title v-text="devPage.text"></v-list-tile-title>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  </header>
</template>
<script>
import {VListGroup, VIcon, VList, VDivider, VNavigationDrawer, VListTile,VListTileAction,VListTileContent,VListTileTitle} from 'vuetify/lib';
export default {
  name: "",
  components:{
    VListGroup,
    VIcon,
    VList,
    VDivider,
    VNavigationDrawer,
    VListTile,
    VListTileAction,
    VListTileContent,
    VListTileTitle
  },
  data () {
    return {
      drawer: null,
      adminPages: [
        {text:"Task Tracker", url: "/tasktracker"},
        {text:"Mobile Projects", url: "/mobileprojects"},
        {text:"Internal Documents", url: "/internaldocuments"},
        {text:"Autospec Stats Mailer", url: "/statsmailer"},
        {text:"Banner Ad Stats", url: "/bannerstats"}
      ],
      dataPages: [
        {text:"Spine", url: "/spine"},
        {text:"Syncer Control Panel", url: "/syncer"}
      ],
      devPages: [
        {text:"Git Lab", url: "/gitlab"},
        {text:"NDC IT", url: "/ndcit"},
        {text:"SendinBlue", url: "/sendinblue"},
        {text:"Apple Connect", url: "/appleconnect"},
        {text:"Google Play Dev Console", url: "/googleplaydev"},
      ]
    }
  }
}
</script>


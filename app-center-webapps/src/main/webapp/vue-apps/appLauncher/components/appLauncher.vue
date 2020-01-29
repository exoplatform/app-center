<template>
  <v-app
    id="app-center-launcher"
    class="VuetifyApp transparent"
    flat>
    <v-container
      px-0
      py-0
      class="transparent">
        <v-layout
          class="transparent">
            <v-icon
              icon
              class="text-xs-center uiApplicationIcon"
              @click="toggleDrawer()" >
            </v-icon>
            <v-navigation-drawer
                    v-model="appLauncherDrawer"
                    right
                    absolute
                    temporary
                    width="420"
                    class="appCenterDrawer">
                <v-row class="mx-0 px-3">
                    <v-list-item class="appLauncherDrawerHeader">
                        <v-list-item-content>
                            <span class="appLauncherDrawerTitle">My Applications</span>
                        </v-list-item-content>
                        <v-list-item-action class="appLauncherDrawerIcons">
                            <i class="uiCloseIcon appLauncherDrawerClose" @click="toggleDrawer()"></i>
                        </v-list-item-action>
                    </v-list-item>
                </v-row>
                <v-divider
                   :inset="inset"
                   class="my-0"/>

                <v-row class="mx-0 px-3">
                </v-row>
            </v-navigation-drawer>
         </v-layout>
        </v-container>
    </v-app>
</template>
<script>
    export default {
        data () {
            return {
                appLauncherDrawer : null
            }
        },
        methods : {
            toggleDrawer() {
                this.appLauncherDrawer = !this.appLauncherDrawer;
            }
        }
    }
</script>
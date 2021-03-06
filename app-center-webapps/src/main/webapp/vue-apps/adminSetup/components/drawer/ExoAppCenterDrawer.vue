<!--
This file is part of the Meeds project (https://meeds.io/).
Copyright (C) 2020 Meeds Association
contact@meeds.io
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.
You should have received a copy of the GNU Lesser General Public License
along with this program; if not, write to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
-->
<template>
  <v-navigation-drawer
    v-model="applicationsDrawer"
    absolute
    right
    stateless
    temporary
    width="420"
    max-width="100vw"
    max-height="100vh"
    class="appCenterDrawer"
  >
    <v-row class="mx-0 title">
      <v-list-item class="applicationsDrawerHeader">
        <v-list-item-content>
          <slot></slot>
        </v-list-item-content>
        <v-list-item-action class="applicationsDrawerIcons">
          <v-btn
            icon
            class="rightIcon"
            @click="$emit('closeDrawer')"
          >
            <v-icon
              large
              class="closeIcon"
            >
              close
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-row>

    <v-divider class="my-0 appHeaderBorder" />

    <v-col class="content  formContent">
      <v-row class="applicationForm">
        <v-col>
          <v-label for="title">
            {{ `${this.$t('appCenter.adminSetupForm.title')}*` }}
          </v-label>
          <input
            v-model="formArray.title"
            type="text"
            name="title"
            class="input-block-level ignore-vuetify-classes my-3 required"
            maxlength="200"
            :readonly="formArray.system"
            :placeholder="$t('appCenter.adminSetupForm.titlePlaceholder')"
            required
          />
          <p v-if="!formArray.system && appTitleExists()" class="error">
            {{ $t('appCenter.adminSetupForm.existingTitle.error') }}
          </p>
          <v-label for="url">
            {{ `${$t('appCenter.adminSetupForm.url')}*` }}
          </v-label>
          <input
            v-model="formArray.url"
            type="url"
            name="url"
            class="input-block-level ignore-vuetify-classes my-3 required"
            maxlength="200"
            :readonly="formArray.system"
            :placeholder="$t('appCenter.adminSetupForm.urlPlaceholder')"
            required
          />
          <v-row class="uploadImageContainer">
            <v-col class="uploadImageTitle" cols="1">
              <v-label for="image">
                {{ $t('appCenter.adminSetupForm.image') }}
              </v-label>
            </v-col>
            <v-col v-show="!formArray.imageFileName" class="uploadImage" cols="3">
              <label for="imageFile" class="custom-file-upload">
                <i class="uiIconFolderSearch uiIcon24x24LightGray"></i>
                <span>
                  {{ $t("appCenter.adminSetupForm.browse") }}
                </span>
              </label>
              <input
                id="imageFile"
                ref="image"
                type="file"
                accept="image/*"
                @change="handleFileUpload"
              >
            </v-col>
            <v-col v-show="formArray.imageFileName" class="imageSet" cols="4">
              <v-list-item
                v-if="formArray.imageFileName != undefined &&
                  formArray.imageFileName != ''"
                class="file-listing"
              >
                <v-list-item-content>
                  <div class="imageTitle">
                    {{ formArray.imageFileName }}
                  </div>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    class="remove-file"
                    icon
                    :disabled="formArray.system"
                    @click="removeFile"
                  >
                    <v-icon small>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>             
            </v-col>
            <v-col v-if="!formArray.invalidImageFormat" class="uploadImageInfo">
              <p
                :class="'sizeInfo' + (formArray.invalidSize ? ' error' : '')"
              >
                <v-icon small>
                  mdi-information
                </v-icon>
                {{ $t("appCenter.adminSetupForm.sizeError") }}
              </p>
            </v-col>
            <v-col v-else class="uploadImageInfo">
              <p
                :class="'imageFormat error'"
              >
                <v-icon small>
                  mdi-information
                </v-icon>
                {{ $t("appCenter.adminSetupForm.imageFormatError") }}
              </p>
            </v-col>
          </v-row>
          <v-label for="description">
            {{ $t('appCenter.adminSetupForm.description') }}
          </v-label>
          <v-textarea
            v-model="formArray.description"
            class="appDescription"
            name="description"
            rows="20"
            counter="1000"
            :rules="rules"
            :placeholder="$t('appCenter.adminSetupForm.descriptionPlaceHolder')"
            no-resize
          >
          </v-textarea>
          <v-row class="applicationProperties">
            <v-col>
              <v-switch v-model="formArray.mandatory" class="mandatoryLabel" :label="$t('appCenter.adminSetupForm.mandatory')"></v-switch>
            </v-col>
            <v-col>
              <v-switch v-model="formArray.active" :label="$t('appCenter.adminSetupForm.active')"></v-switch>
            </v-col>
            <v-col>
              <v-switch v-model="formArray.mobile" :label="$t('appCenter.adminSetupForm.mobile')"></v-switch>
            </v-col>
          </v-row>
          <v-label for="permissions">
            {{ $t('appCenter.adminSetupForm.permissions') }}
          </v-label>
          <exo-suggester
            v-model="permissions"
            class="input-block-level ignore-vuetify-classes my-3"
            name="permissions"
            maxlength="200"
            :options="suggesterOptions"
            :source-providers="[findGroups]"
            :application-permissions="appPermissions"
            :placeholder="$t('appCenter.adminSetupForm.permissionsPlaceHolder')"
          />
          <v-label for="helpPage">
            {{ $t('appCenter.adminSetupForm.helpPage') }}
          </v-label>
          <input
            v-model="formArray.helpPageURL"
            class="input-block-level ignore-vuetify-classes my-3"
            type="url"
            name="name"
            maxlength="200"
            :placeholder="$t('appCenter.adminSetupForm.helpPagePlaceholder')"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-row class="drawerActions mx-0">
      <v-card
        flat
        tile
        class="d-flex flex justify-end mx-2 px-1"
      >
        <button type="button" class="btn ml-2 applicationsActionBtn" @click="resetForm">
          {{ $t('appCenter.adminSetupForm.cancel') }}
        </button>
        <button type="button" class="btn btn-primary ml-6 applicationsActionBtn" :disabled="!canSaveApplication" @click="submitForm">
          {{ $t('appCenter.adminSetupForm.save') }}
        </button>
      </v-card>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    applicationsDrawer: {
      type: Boolean,
      default: false
    },
    formArray: {
      type: Object,
      default: null
    },
    appPermissions: {
      type: Array,
      default: () => []
    },
    existingAppNames: {
      type: Array,
      default: () => []
    },
    appToEditOriginalTitle: {
      type: Object,
      default: null
    },
  },
  data() {
    const maxDescriptionSize = 1000;
    const component = this;
    return {
      isAppMandatory: false,
      suggesterOptions: {
        type: 'tag',
        plugins: ['remove_button', 'restore_on_backspace'],
        create: false,
        createOnBlur: false,
        highlight: false,
        openOnFocus: false,
        valueField: 'value',
        labelField: 'text',
        searchField: ['text'],
        closeAfterSelect: false,
        dropdownParent: 'body',
        hideSelected: true,
        renderMenuItem (item, escape) {
          return component.renderMenuItem(item, escape);
        },
        sortField: [{field: 'order'}, {field: '$score'}],
      },
      permissions: [],
      rules: [v => v.length <= maxDescriptionSize],
    };
  },
  computed: {
    canSaveApplication() {
      const maxDescriptionSize = 1000;
      return this.formArray.title && this.formArray.title !== '' && !this.appTitleExists() && !this.formArray.invalidSize && !this.formArray.invalidImage &&
          !this.formArray.invalidImageFormat && this.validUrl(this.formArray) && this.formArray.description.length <= maxDescriptionSize && (this.validHelpPageUrl(this.formArray) || this.formArray.helpPageURL === '');
    }
  },
  watch: {
    applicationsDrawer() {
      if (this.applicationsDrawer) {
        this.$nextTick().then(() => {
          $('#app .v-overlay').click(() => {
            this.permissions = [];
            this.$emit('closeDrawer');
          });
        });
      } else {
        $('body').removeClass('hide-scroll');
      }
    },
    appPermissions() {
      this.permissions = [];
      const groups = this.appPermissions.map(permission => permission.id);
      this.permissions.push(...groups);
    },
  },
  mounted () {
    $('.formContent').on( 'scroll', function(){
      $('.selectize-dropdown').css('display', 'none');
      $('.selectize-input').find('input').blur();
    });
  },
  created() {
    $(document).on('keydown', (event) => {
      if (event.key === 'Escape') {
        this.$emit('closeDrawer');
      }
    });
  },
  methods: {
    validUrl(app) {
      const url = app && app.url;
      return app.system || url && (url.indexOf('/portal/') === 0 || url.indexOf('./') === 0 || url.match(/(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}/g));
    },

    validHelpPageUrl(app) {
      const url = app && app.helpPageURL;
      return app.system || url && (url.indexOf('/portal/') === 0 || url.indexOf('./') === 0 || url.match(/(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}/g));
    },

    handleFileUpload() {
      const MAX_FILE_SIZE = 100000;
      const imageTypeIndex = 6;
      if (this.$refs.image.files.length > 0) {
        const imageFormatType = this.$refs.image.files[0].type.substring(imageTypeIndex);
        if (imageFormatType.includes('svg')) {
          this.formArray.invalidImageFormat = true;
        }
        this.formArray.imageFileName = this.$refs.image.files[0].name;
        if (this.$refs.image.files[0].size > MAX_FILE_SIZE) {
          this.formArray.invalidSize = true;
          return;
        }
        this.formArray.invalidImage = false;
      } else {
        this.removeFile();
      }
    },

    removeFile() {
      this.formArray.imageFileName = '';
      this.formArray.imageFileBody = '';
      this.formArray.imageFileId = '';
      this.formArray.invalidSize = false;
      this.formArray.invalidImage = false;
      this.formArray.invalidImageFormat = false;
      if (this.$refs.image.files.length > 0) {
        // remove file from the input
        document.getElementById('imageFile').value = '';
      }
    },

    addOrEditApplication() {
      return fetch('/portal/rest/app-center/applications', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: this.formArray.id ? 'PUT' : 'POST',
        body: JSON.stringify({
          id: this.formArray.id,
          title: this.formArray.title,
          url: this.formArray.url,
          helpPageURL: this.formArray.helpPageURL,
          description: this.formArray.description,
          active: this.formArray.active,
          mandatory: this.formArray.mandatory,
          isMobile: this.formArray.mobile,
          system: this.formArray.system,
          permissions: this.permissions.map(group => `*:${group}`),
          imageFileBody: this.formArray.imageFileBody,
          imageFileName: this.formArray.imageFileName,
          imageFileId: this.formArray.imageFileId,
        })
      })
        .then(() => {
          this.$emit('initApps');
        })
        .catch(e => {
          const UNAUTHORIZED_ERROR_CODE = 401;
          if (e.response.status === UNAUTHORIZED_ERROR_CODE) {
            this.error = this.$t('appCenter.adminSetupForm.unauthorized');
          } else {
            this.error = this.$t('appCenter.adminSetupForm.error');
          }
        }).finally(() => {
          this.permissions = [];
          this.$emit('closeDrawer');
        });
    },

    submitForm() {
      if (this.$refs.image && this.$refs.image.files.length > 0) {
        this.formArray.imageFileName = this.$refs.image.files[0].name;
        const reader = new FileReader();
        reader.onload = e => {
          if (!e.target.result.includes('data:image')) {
            this.formArray.invalidImage = true;
            return;
          }
          this.formArray.imageFileBody = e.target.result;
          this.addOrEditApplication();
        };
        reader.readAsDataURL(this.$refs.image.files[0]);
      } else {
        this.addOrEditApplication();
      }
    },

    resetForm() {
      this.permissions = [];
      this.$emit('resetForm');
    },

    findGroups (query, callback) {
      if (!query.length) {
        return callback();
      }
      this.getGroups(query).then(data => {
        const groups = [];
        for(const group of data) {
          groups.push({
            avatarUrl: null,
            text: `*:${group.id}`,
            value: group.id,
            type: 'group'
          });
        }
        callback(groups);
      });
    },

    getGroups(query) {
      return fetch(`/portal/rest/v1/groups?q=${query}`, { credentials: 'include' }).then(resp => resp.json());
    },

    renderMenuItem (item, escape) {
      return `
        <div class="item">*:${escape(item.value)}</div>
      `;
    },
    
    appTitleExists() {
      return this.formArray.title !== this.appToEditOriginalTitle && this.existingAppNames.includes(this.formArray.title);
    },
  },
};
</script>

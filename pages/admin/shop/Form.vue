<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t(title) }}
          </h3>
          <div class="card-tools">
            <ButtonBack />
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-8">
              <div class="form-row">
                <div class="form-group col-lg-6">
                  <label
                    for="shop_name"
                    class="required"
                    :class="{'text-red': checkValidate('shop_name')}"
                  >
                    {{ $t('label.shop_name') }}
                  </label>
                  <input
                    id="shop_name"
                    v-model="shop_name"
                    type="text"
                    class="form-control"
                    :placeholder="$t('pla.shop_name')"
                    :class="{'is-invalid': checkValidate('shop_name')}"
                  >
                  <div v-if="checkValidate('shop_name')" class="invalid-feedback">
                    {{ validate.shop_name[0] }}
                  </div>
                </div>
                <div class="form-group col-lg-6">
                  <label
                    for="owner_name"
                    class="required"
                    :class="{'text-red': checkValidate('owner_name')}"
                  >
                    {{ $t('label.owner_name') }}
                  </label>
                  <input
                    id="owner_name"
                    v-model="owner_name"
                    type="text"
                    class="form-control"
                    :placeholder="$t('pla.owner_name')"
                    :class="{'is-invalid': checkValidate('owner_name')}"
                  >
                  <div v-if="checkValidate('owner_name')" class="invalid-feedback">
                    {{ validate.owner_name[0] }}
                  </div>
                </div>
                <div class="form-group col-lg-6">
                  <label
                    for="phone"
                    class="required"
                    :class="{'text-red': checkValidate('phone')}"
                  >
                    {{ $t('label.phone') }}
                  </label>
                  <input
                    id="phone"
                    v-model="phone"
                    v-mask="'### ### ####'"
                    type="text"
                    class="form-control"
                    :placeholder="$t('pla.phone_number')"
                    :class="{'is-invalid': checkValidate('phone')}"
                  >
                  <div v-if="checkValidate('phone')" class="invalid-feedback">
                    {{ validate.phone[0] }}
                  </div>
                </div>
                <div class="form-group col-lg-6">
                  <label
                    for="email"
                    class="required"
                    :class="{'text-red': checkValidate('email')}"
                  >
                    {{ $t('label.email') }}
                  </label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control"
                    :placeholder="$t('pla.email')"
                    :class="{'is-invalid': checkValidate('email')}"
                  >
                  <div v-if="checkValidate('email')" class="invalid-feedback">
                    {{ validate.email[0] }}
                  </div>
                </div>
                <div class="form-group col-lg-6">
                  <label for="home_number">
                    {{ $t('label.home_number') }}
                  </label>
                  <input
                    id="home_number"
                    v-model="home_number"
                    type="text"
                    class="form-control"
                    :placeholder="$t('pla.home_number')"
                  >
                </div>
                <div class="form-group col-lg-6">
                  <label for="street_number">
                    {{ $t('label.street_number') }}
                  </label>
                  <input
                    id="street_number"
                    v-model="street_number"
                    type="text"
                    class="form-control"
                    :placeholder="$t('pla.street_number')"
                  >
                </div>
                <div class="form-group col-lg-6">
                  <label for="province">
                    {{ $t('menu.province') }}
                  </label>
                  <select
                    id="province"
                    v-model="province"
                    class="form-control"
                    @change="getDistrict"
                  >
                    <option selected hidden :value="null">
                      {{ $t('label.select_one_option') }} ...
                    </option>
                    <template v-if="provinces && provinces.length > 0">
                      <option v-for="(item, key) in provinces" :key="key" :value="item">
                        {{ item['name_' + $i18n.locale] }}
                      </option>
                    </template>
                  </select>
                </div>
                <div class="form-group col-lg-6">
                  <label for="district">
                    {{ $t('menu.district') }}
                  </label>
                  <select
                    id="district"
                    v-model="district"
                    class="form-control"
                    :disabled="!province"
                    @change="getCommune"
                  >
                    <option selected hidden :value="null">
                      {{ $t('label.select_one_option') }} ...
                    </option>
                    <template v-if="districts && districts.length > 0">
                      <option v-for="(item, key) in districts" :key="key" :value="item">
                        {{ item['name_' + $i18n.locale] }}
                      </option>
                    </template>
                  </select>
                </div>
                <div class="form-group col-lg-6">
                  <label for="commune">
                    {{ $t('menu.commune') }}
                  </label>
                  <select
                    id="commune"
                    v-model="commune"
                    class="form-control"
                    :disabled="!district"
                    @change="getVillage"
                  >
                    <option selected hidden :value="null">
                      {{ $t('label.select_one_option') }} ...
                    </option>
                    <template v-if="communes && communes.length > 0">
                      <option v-for="(item, key) in communes" :key="key" :value="item">
                        {{ item['name_' + $i18n.locale] }}
                      </option>
                    </template>
                  </select>
                </div>
                <div class="form-group col-lg-6">
                  <label for="village">
                    {{ $t('menu.village') }}
                  </label>
                  <select
                    id="village"
                    v-model="village"
                    class="form-control"
                    :disabled="!commune"
                  >
                    <option selected hidden :value="null">
                      {{ $t('label.select_one_option') }} ...
                    </option>
                    <template v-if="villages && villages.length > 0">
                      <option v-for="(item, key) in villages" :key="key" :value="item">
                        {{ item['name_' + $i18n.locale] }}
                      </option>
                    </template>
                  </select>
                </div>
                <div class="form-group col-lg-12">
                  <label for="description">
                    {{ $t('label.description') }}
                  </label>
                  <textarea
                    id="description"
                    v-model="description"
                    class="form-control overflow-auto"
                    rows="10"
                    :placeholder="$t('pla.description') + ' ...'"
                    style="max-height: 237px"
                  />
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>{{ $t('label.enabled') }}</label>
                    <div class="w-100">
                      <div class="btn-group" role="group" aria-label="Basic example">
                        <button
                          type="button"
                          class="btn"
                          :class="enabled ? 'btn-success text-bold' : 'btn-light'"
                          @click="enabled = true"
                        >
                          {{ $t('btn.enable') }}
                        </button>
                        <button
                          type="button"
                          class="btn"
                          :class="!enabled ? 'btn-danger text-bold' : 'btn-light'"
                          @click="enabled = false"
                        >
                          {{ $t('btn.disable') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group text-center mb-5">
                <label>
                  {{ $t('label.shop_logo') }}
                </label>
                <template v-if="preview_shop_logo">
                  <img :src="preview_shop_logo" alt="" width="100%" class="no-shop-logo">
                </template>
                <template v-else>
                  <div class="no-shop-logo">
                    <label>250x250</label>
                  </div>
                </template>
                <div class="shop__btn-upload">
                  <button class="btn btn-primary btn-block mt-2" @click="toggleShowShopLogo">
                    {{ $t('label.uploadShopLogo') }}
                  </button>
                  <vue-crop-avatar
                    v-model="show_shop_logo"
                    field="logo"
                    :width="250"
                    :lang-type="langType"
                    :height="250"
                    :url="''"
                    :params="params"
                    :headers="headers"
                    img-format="png"
                    @crop-success="cropShopLogoSuccess"
                  />
                </div>
              </div>

              <div class="form-group text-center">
                <label for="village">
                  {{ $t('label.shop_owner') }}
                </label>
                <template v-if="preview_shop_owner">
                  <img :src="preview_shop_owner" alt="" width="100%" class="no-shop-logo">
                </template>
                <template v-else>
                  <div class="no-shop-logo">
                    <label>250x250</label>
                  </div>
                </template>
                <div class="shop__btn-upload">
                  <button class="btn btn-primary btn-block mt-2" @click="toggleShowShopOwner">
                    {{ $t('label.uploadShopOwner') }}
                  </button>
                  <vue-crop-avatar
                    v-model="show_shop_owner"
                    field="avatar"
                    :width="250"
                    :lang-type="langType"
                    :height="250"
                    :url="''"
                    :params="params"
                    :headers="headers"
                    img-format="png"
                    @crop-success="cropShopOwnerSuccess"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-light" @click="$router.back()">
            <i class="fas fa-times mr-1" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </button>
          <button
            class="btn"
            :class="isEdit ? 'btn-primary' : 'btn-success'"
            @click="storeOrEdit"
          >
            <i class="fas fa-save mr-1" />
            <strong>{{ isEdit ? $t('btn.update') : $t('btn.save') }}</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'

export default {
  name: 'ShopForm',
  components: { ButtonBack },
  props: {
    title: {
      type: String,
      default: 'label.add_new'
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    oldData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      base_api: process.env.VUE_APP_API,
      villages: [],

      provinces: [],
      districts: [],
      communes: [],
      validate: null,
      show_shop_logo: false,
      show_shop_owner: false,
      headers: null,
      preview_shop_logo: null,
      preview_shop_owner: null,

      id: null,
      shop_name: null,
      owner_name: null,
      phone: null,
      email: null,
      home_number: null,
      street_number: null,
      province: null,
      district: null,
      commune: null,
      village: null,
      logo: null,
      description: null,
      owner_avatar: null,
      enabled: false,
      params: {
        shop_id: null,
        name: 'avatar'
      }
    }
  },
  computed: {
    langType () {
      return this.$i18n.locale
    }
  },
  created () {
    if (this.oldData) {
      this.id = this.oldData._id
      this.shop_name = this.oldData.name_en
      this.owner_name = this.oldData.owner_name
      this.phone = this.oldData.phone
      this.email = this.oldData.email
      this.home_number = this.oldData.home_number
      this.street_number = this.oldData.street_number
      this.description = this.oldData.description
      this.enabled = this.oldData.enabled
      if (this.oldData.province) {
        this.province = this.oldData.province
      }
      if (this.oldData.province) {
        this.getDistrict()
        this.district = this.oldData.district
      }
      if (this.oldData.district) {
        this.getCommune()
        this.commune = this.oldData.commune
      }
      if (this.oldData.commune) {
        this.getVillage()
        this.village = this.oldData.village
      }
      if (this.oldData.logo) {
        this.preview_shop_logo = process.env.VUE_APP_API + '/' + this.oldData.logo
      }
      if (this.oldData.avatar) {
        this.preview_shop_owner = process.env.VUE_APP_API + '/' + this.oldData.avatar
      }
    }
  },
  mounted () {
    this.getProvince()
  },
  methods: {
    checkValidate (key) {
      if (key) {
        return this.validate && this.validate.hasOwnProperty(key)
      }
      return false
    },
    toggleShowShopOwner () {
      this.show_shop_owner = !this.show_shop_owner
    },
    toggleShowShopLogo () {
      this.show_shop_logo = !this.show_shop_logo
    },
    cropShopLogoSuccess (imgDataUrl, field) {
      this.logo = imgDataUrl
      this.preview_shop_logo = imgDataUrl
    },
    cropShopOwnerSuccess (imgDataUrl, field) {
      this.owner_avatar = imgDataUrl
      this.preview_shop_owner = imgDataUrl
    },
    storeOrEdit () {
      this.validate = null
      const formData = new FormData()
      if (this.id) {
        formData.append('id', this.id)
      }
      if (this.shop_name) { formData.append('shop_name', this.shop_name) }
      if (this.owner_name) { formData.append('owner_name', this.owner_name) }
      if (this.phone) { formData.append('phone', this.phone) }
      if (this.email) { formData.append('email', this.email) }
      if (this.home_number) { formData.append('home_number', this.home_number) }
      if (this.street_number) { formData.append('street_number', this.street_number) }
      if (this.province) { formData.append('province_id', this.province._id) }
      if (this.district) { formData.append('district_id', this.district._id) }
      if (this.commune) { formData.append('commune_id', this.commune._id) }
      if (this.village) { formData.append('village_id', this.village._id) }
      if (this.description) { formData.append('description', this.description) }
      if (this.logo) { formData.append('logo', this.logo) }
      if (this.owner_avatar) { formData.append('shop_owner', this.owner_avatar) }
      formData.append('enabled', this.enabled)
      this.$axios
        .post(this.$base_api + '/api/backend/shop/store-or-edit', formData)
        .then((res) => {
          this.$router.push({ name: 'list-shop' })
        }).catch((error) => {
          if (error.response.status === 422) {
            this.validate = error.response.data.errors
          } else {
            this.onResponseError(error)
          }
        })
    },
    getProvince () {
      this.$axios.get(this.$base_api + '/api/backend/location/province/get-province')
        .then((res) => {
          this.provinces = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    getDistrict () {
      this.district = null
      this.commune = null
      this.village = null
      this.$axios.post(this.$base_api + '/api/backend/location/district/get-district', {
        parent_code: this.province.code
      })
        .then((res) => {
          this.districts = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    getCommune () {
      this.commune = null
      this.village = null
      this.$axios.post(this.$base_api + '/api/backend/location/commune/get-commune', {
        parent_code: this.district.code
      })
        .then((res) => {
          this.communes = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    getVillage () {
      this.village = null
      this.$axios.post(this.$base_api + '/api/backend/location/village/get-village', {
        parent_code: this.commune.code
      })
        .then((res) => {
          this.villages = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.no-shop-logo,
.shop__btn-upload {
  width: 250px;
  margin: 0 auto;
}

.no-shop-logo {
  height: 250px;
  background-color: #6c757d;
  border: 1px solid rgba(0, 0, 0, .125);
  border-radius: .25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-shop-logo label {
  color: white;
}
</style>

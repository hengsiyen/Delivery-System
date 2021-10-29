<template>
  <div>
    <HeaderMobile hide-button-logout hide-button-home show-navbar-text :navbar-text="$t(title)">
      <template v-slot:btn-back>
        <ButtonBackMobile />
      </template>
    </HeaderMobile>
    <div class="mobile-content-h col-12 pt-4">
      <div class="row mobile-body-padding">
        <div class="col-lg-12 p-0">
          <div class="form-row">
            <div class="col-lg-12 mb-3 text-center border-bottom asr-form-sub-title text-capitalize">
              <label>{{ $t('label.shopInfo') }}</label>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-lg-6">
              <label class="font-s-14 required">{{ $t('label.nameEn') }}</label>
              <div class="input-group" :class="{'is-invalid': checkValidate('shop_name_en')}">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-store" /></span>
                </div>
                <input
                  v-model="shop_name_en"
                  type="text"
                  class="form-control"
                  :placeholder="$t('pla.nameEn')"
                  :class="{'is-invalid': checkValidate('shop_name_en')}"
                >
              </div>
              <div v-if="checkValidate('shop_name_en')" class="invalid-feedback">
                {{ validate.shop_name_en[0] }}
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label class="font-s-14">{{ $t('label.nameKm') }}</label>
              <div class="input-group" :class="{'is-invalid': checkValidate('shop_name_km')}">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-store" /></span>
                </div>
                <input
                  v-model="shop_name_km"
                  type="text"
                  class="form-control"
                  :placeholder="$t('pla.nameKm')"
                  :class="{'is-invalid': checkValidate('shop_name_km')}"
                >
              </div>
              <div v-if="checkValidate('shop_name_km')" class="invalid-feedback">
                {{ validate.shop_name_km[0] }}
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label class="font-s-14 required">{{ $t('label.phone') }}</label>
              <div class="input-group" :class="{'is-invalid': checkValidate('phone')}">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-phone" /></span>
                </div>
                <input
                  id="phone"
                  v-model="phone"
                  v-mask="'### ### ####'"
                  type="text"
                  class="form-control"
                  :placeholder="$t('pla.phone_number')"
                  :class="{'is-invalid': checkValidate('phone')}"
                >
              </div>
              <div v-if="checkValidate('phone')" class="invalid-feedback">
                {{ validate.phone[0] }}
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label class="font-s-14">{{ $t('label.email') }}</label>
              <div class="input-group" :class="{'is-invalid': checkValidate('email')}">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-envelope" /></span>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="form-control"
                  :placeholder="$t('pla.email')"
                  :class="{'is-invalid': checkValidate('email')}"
                >
              </div>
              <div v-if="checkValidate('email')" class="invalid-feedback">
                {{ validate.email[0] }}
              </div>
            </div>
            <div class="form-group col-lg-3">
              <label class="font-s-14">{{ $t('label.home_number') }}</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-hashtag" /></span>
                </div>
                <input
                  id="home_number"
                  v-model="home_number"
                  type="text"
                  class="form-control"
                  :placeholder="$t('pla.home_number')"
                >
              </div>
            </div>
            <div class="form-group col-lg-3">
              <label class="font-s-14">{{ $t('label.street_number') }}</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-road" /></span>
                </div>
                <input
                  id="street_number"
                  v-model="street_number"
                  type="text"
                  class="form-control"
                  :placeholder="$t('pla.street_number')"
                >
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label class="font-s-14">{{ $t('label.province') }}</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-map-marker-alt" /></span>
                </div>
                <select
                  id="province"
                  v-model="province"
                  class="form-control"
                  @change="getDistrict"
                >
                  <option selected hidden :value="null">
                    {{ $t('label.select_province') }}
                  </option>
                  <template v-if="provinces && provinces.length > 0">
                    <option v-for="(item, key) in provinces" :key="key" :value="item">
                      {{ item['name_' + $i18n.locale] }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label class="font-s-14">{{ $t('label.district') }}</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-map-marker-alt" /></span>
                </div>
                <select
                  id="district"
                  v-model="district"
                  class="form-control"
                  :disabled="!province"
                  @change="getCommune"
                >
                  <option selected hidden :value="null">
                    {{ $t('label.select_district') }}
                  </option>
                  <template v-if="districts && districts.length > 0">
                    <option v-for="(item, key) in districts" :key="key" :value="item">
                      {{ item['name_' + $i18n.locale] }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label class="font-s-14">{{ $t('label.commune') }}</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-map-marker-alt" /></span>
                </div>
                <select id="commune" v-model="commune" class="form-control" :disabled="!district" @change="getVillage">
                  <option selected hidden :value="null">
                    {{ $t('label.select_commune') }}
                  </option>
                  <template v-if="communes && communes.length > 0">
                    <option v-for="(item, key) in communes" :key="key" :value="item">
                      {{ item['name_' + $i18n.locale] }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label class="font-s-14">{{ $t('label.village') }}</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-map-marker-alt" /></span>
                </div>
                <select id="village" v-model="village" class="form-control" :disabled="!commune">
                  <option selected hidden :value="null">
                    {{ $t('label.select_village') }}
                  </option>
                  <template v-if="villages && villages.length > 0">
                    <option v-for="(item, key) in villages" :key="key" :value="item">
                      {{ item['name_' + $i18n.locale] }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
            <div class="form-group col-lg-12">
              <label class="font-s-14">{{ $t('label.description') }}</label>
              <textarea
                id="description"
                v-model="description"
                class="form-control overflow-auto"
                rows="3"
                :placeholder="$t('pla.description')"
                style="max-height: 237px"
              />
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="font-s-14">{{ $t('label.status') }}</label>
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
          <div class="form-row">
            <div class="col-lg-12">
              <div class="form-group">
                <div class="d-flex align-items-center justify-content-between">
                  <div><label class="mb-0">{{ $t('label.shop_logo') }}</label></div>
                  <div>
                    <div class="btn btn-default btn-upload-image">
                      <i class="fas fa-image" />
                      <input
                        ref="getShopLogoImg"
                        type="file"
                        name="file"
                        accept="image/*"
                        class="cursor-pointer"
                        @change="getShopLogoImg"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="selected_shop_logo || preview_shop_logo">
              <div class="col-lg-12">
                <div class="form-group mx-auto croppie-w">
                  <template v-if="selected_shop_logo">
                    <div :style="`width: ${croppie_size}px`" class="text-center mx-auto">
                      <vue-croppie
                        ref="croppieShopLogoRef"
                        :enable-orientation="true"
                        :boundary="{ width: croppie_size, height: croppie_size}"
                        :enable-resize="false"
                        :viewport="{ width: 295, height: 295, type: 'square' }"
                        @result="resultShopLogo"
                      />
                      <button class="btn btn-primary btn-upload-image">
                        <i class="fas fa-link" />
                        <input
                          ref="getShopLogoImg"
                          type="file"
                          name="file"
                          accept="image/*"
                          @change="getShopLogoImg"
                        >
                      </button>
                      <button class="btn btn-light" @click="rotateShopLogo(-90)">
                        <i class="fas fa-undo-alt" />
                      </button>
                      <button class="btn btn-light" @click="rotateShopLogo(90)">
                        <i class="fas fa-redo-alt" />
                      </button>
                      <button class="btn btn-light" @click="removeShopLogoImg">
                        <i class="fas fa-times" />
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      :style="`width: ${croppie_size}px; height: ${croppie_size}px`"
                      class="mx-auto bg-whitesmoke d-flex align-items-center justify-content-center rounded btn-upload-image border cursor-pointer"
                    >
                      <template v-if="isEdit && preview_shop_logo">
                        <img :src="preview_shop_logo" class="img-thumbnail">
                      </template>
                      <template v-else>
                        <div class="text-gray">
                          <i class="fas fa-upload fa-2x" />
                          <p class="mt-2">
                            {{ $t('label.click_here_to_browse_image') }}
                          </p>
                        </div>
                      </template>
                      <input
                        ref="getShopLogoImg"
                        type="file"
                        name="file"
                        accept="image/*"
                        class="cursor-pointer"
                        @change="getShopLogoImg"
                      >
                    </div>
                  </template>
                  <template v-if="isEdit && preview_shop_logo && !selected_shop_logo">
                    <p class="mt-2 text-center">
                      {{ $t('label.tap_on_image_to_edit') }}
                    </p>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="col-lg-12 p-0 mt-4">
          <div class="form-row">
            <div class="col-lg-12 mb-3 text-center border-bottom asr-form-sub-title text-capitalize">
              <label>{{ $t('label.ownerInfo') }}</label>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-lg-6">
              <label class="font-s-14 required">{{ $t('label.owner_name') }}</label>
              <div class="input-group" :class="{'is-invalid': checkValidate('owner_name')}">
                <div class="input-group-prepend">
                  <span class=" input-group-text mobile-icon"><i class="fas fa-user" /></span>
                </div>
                <input
                  id="owner_name"
                  v-model="owner_name"
                  type="text"
                  class="form-control"
                  :placeholder="$t('pla.owner_name')"
                  :class="{'is-invalid': checkValidate('owner_name')}"
                >
              </div>
              <div v-if="checkValidate('owner_name')" class="invalid-feedback">
                {{ validate.owner_name[0] }}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-lg-12">
              <div class="form-group">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <label class="mb-0">{{ $t('label.shop_owner_image') }}</label>
                  </div>
                  <div class="btn btn-default btn-upload-image">
                    <i class="fas fa-user-circle" />
                    <input
                      ref="getShopOwnerImg"
                      type="file"
                      name="file"
                      accept="image/*"
                      class="cursor-pointer"
                      @change="getShopOwnerImg"
                    >
                  </div>
                </div>
              </div>
            </div>
            <template v-if="selected_shop_owner || preview_shop_owner">
              <div class="col-lg-12">
                <div class="form-group mx-auto croppie-w">
                  <template v-if="selected_shop_owner">
                    <div :style="`width: ${croppie_size}px`" class="text-center mx-auto">
                      <vue-croppie
                        ref="croppieShopOwnerRef"
                        :enable-orientation="true"
                        :boundary="{ width: croppie_size, height: croppie_size}"
                        :enable-resize="false"
                        :viewport="{ width: 295, height: 295, type: 'square' }"
                        @result="resultShopOwner"
                      />
                      <button class="btn btn-primary btn-upload-image">
                        <i class="fas fa-link" />
                        <input
                          ref="getShopLogoImg"
                          type="file"
                          name="file"
                          accept="image/*"
                          @change="getShopOwnerImg"
                        >
                      </button>
                      <!-- Rotate angle is Number -->
                      <button class="btn btn-light" @click="rotateShopOwner(-90)">
                        <i class="fas fa-undo-alt" />
                      </button>
                      <button class="btn btn-light" @click="rotateShopOwner(90)">
                        <i class="fas fa-redo-alt" />
                      </button>
                      <button class="btn btn-light" @click="removeShopOwnerImg">
                        <i class="fas fa-times" />
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      :style="`width: ${croppie_size}px; height: ${croppie_size}px`"
                      class="mx-auto bg-whitesmoke d-flex align-items-center justify-content-center rounded btn-upload-image border cursor-pointer"
                    >
                      <template v-if="isEdit && preview_shop_owner">
                        <img :src="preview_shop_owner" class="img-thumbnail">
                      </template>
                      <template v-else>
                        <div class="text-gray">
                          <i class="fas fa-upload fa-2x" />
                          <p class="mt-2">
                            {{ $t('label.click_here_to_browse_image') }}
                          </p>
                        </div>
                      </template>
                      <input
                        ref="getShopOwnerImg"
                        type="file"
                        name="file"
                        accept="image/*"
                        class="cursor-pointer"
                        @change="getShopOwnerImg"
                      >
                    </div>
                  </template>
                  <template v-if="isEdit && preview_shop_owner && !selected_shop_owner">
                    <p class="mt-2 text-center">
                      {{ $t('label.tap_on_image_to_edit') }}
                    </p>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="mobile-btn-action border-top mobile-body-padding">
        <div class="w-100 text-right">
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
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import ButtonBackMobile from '@/components/UiElements/ButtonBackMobile'

export default {
  name: 'MobileShopForm',
  components: { ButtonBackMobile, HeaderMobile },
  props: {
    title: {
      type: String,
      default: 'label.shopCreate'
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      base_api: process.env.VUE_APP_API,

      provinces: [],
      districts: [],
      communes: [],
      villages: [],
      validate: null,

      id: null,
      shop_name_en: null,
      shop_name_km: null,
      owner_name: null,
      phone: null,
      email: null,
      home_number: null,
      street_number: null,
      province: null,
      district: null,
      commune: null,
      village: null,
      description: null,
      enabled: false,

      croppie_size: 300,
      cropped_shop_logo: null,
      cropped_shop_owner: null,
      selected_shop_logo: false,
      selected_shop_owner: false,
      preview_shop_logo: null,
      preview_shop_owner: null
    }
  },
  mounted () {
    this.getProvince()
    if (this.isEdit && this.$route.params.id) {
      this.getShopData()
    }
  },
  methods: {
    checkValidate (key) {
      return this.validate && this.validate.hasOwnProperty(key)
    },
    storeOrEdit () {
      this.validate = null
      const formData = new FormData()
      if (this.selected_shop_logo) {
        this.cropShopLogo()
      }
      if (this.selected_shop_owner) {
        this.cropShopOwner()
      }

      setTimeout(() => {
        if (this.id) {
          formData.append('id', this.id)
        }
        if (this.shop_name_en) {
          formData.append('shop_name_en', this.shop_name_en)
        }
        if (this.shop_name_km) {
          formData.append('shop_name_km', this.shop_name_km)
        }
        if (this.owner_name) {
          formData.append('owner_name', this.owner_name)
        }
        if (this.phone) {
          formData.append('phone', this.phone)
        }
        if (this.email) {
          formData.append('email', this.email)
        }
        if (this.home_number) {
          formData.append('home_number', this.home_number)
        }
        if (this.street_number) {
          formData.append('street_number', this.street_number)
        }
        if (this.province) {
          formData.append('province_id', this.province._id)
        }
        if (this.district) {
          formData.append('district_id', this.district._id)
        }
        if (this.commune) {
          formData.append('commune_id', this.commune._id)
        }
        if (this.village) {
          formData.append('village_id', this.village._id)
        }
        if (this.description) {
          formData.append('description', this.description)
        }
        if (this.logo) {
          formData.append('logo', this.logo)
        }
        if (this.owner_avatar) {
          formData.append('shop_owner', this.owner_avatar)
        }
        formData.append('enabled', this.enabled)
        if (this.cropped_shop_logo) {
          formData.append('logo', this.cropped_shop_logo)
        }
        if (this.cropped_shop_owner) {
          formData.append('shop_owner', this.cropped_shop_owner)
        }
        this.$axios
          .post(this.$base_api + '/api/backend/shop/store-or-edit', formData)
          .then((res) => {
            const result = res.data.data
            this.$router.push({ name: 'mobile-shop-show', params: { id: result._id } })
          }).catch((error) => {
            if (error.response.status === 422) {
              this.validate = error.response.data.errors
              this.onResponseError(error)
            } else {
              this.onResponseError(error)
            }
          })
      }, 500)
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
    },

    getShopLogoImg (event) {
      const self = this
      const file = event.target.files[0]
      const reader = new FileReader()
      this.selected_shop_logo = file
      reader.onload = function (e) {
        if (self.$refs.croppieShopLogoRef) {
          self.$refs.croppieShopLogoRef.bind({
            url: e.target.result
          })
        }
      }
      reader.readAsDataURL(file)
    },
    cropShopLogo () {
      const options = { format: 'png', circle: false }
      this.$refs.croppieShopLogoRef.result(options, (output) => {
        this.cropped_shop_logo = output
      })
    },
    resultShopLogo (output) {
      this.cropped_shop_logo = output
    },
    rotateShopLogo (rotationAngle) {
      this.$refs.croppieShopLogoRef.rotate(rotationAngle)
    },
    removeShopLogoImg () {
      this.cropped_shop_logo = null
      this.selected_shop_logo = null
      this.$refs.croppieShopLogoRef.refresh()
    },

    getShopOwnerImg (event) {
      const self = this
      const file = event.target.files[0]
      const reader = new FileReader()
      this.selected_shop_owner = file
      reader.onload = function (e) {
        if (self.$refs.croppieShopOwnerRef) {
          self.$refs.croppieShopOwnerRef.bind({
            url: e.target.result
          })
        }
      }
      reader.readAsDataURL(file)
    },
    cropShopOwner () {
      const options = { format: 'png', circle: false }
      this.$refs.croppieShopOwnerRef.result(options, (output) => {
        this.cropped_shop_owner = output
      })
    },
    resultShopOwner (output) {
      this.cropped_shop_owner = output
    },
    rotateShopOwner (rotationAngle) {
      this.$refs.croppieShopOwnerRef.rotate(rotationAngle)
    },
    removeShopOwnerImg () {
      this.cropped_shop_owner = null
      this.selected_shop_owner = null
      this.$refs.croppieShopOwnerRef.refresh()
    },

    getShopData () {
      this.$axios.post(this.$base_api + '/api/backend/shop/show', {
        id: this.$route.params.id
      })
        .then((res) => {
          const oldData = res.data.data
          if (oldData) {
            this.id = oldData._id
            this.shop_name_en = oldData.name_en
            this.shop_name_km = oldData.name_km
            this.owner_name = oldData.owner_name
            this.phone = oldData.phone
            this.email = oldData.email
            this.home_number = oldData.home_number
            this.street_number = oldData.street_number
            this.description = oldData.description
            this.enabled = oldData.enabled
            if (oldData.province) {
              this.province = oldData.province
            }
            if (oldData.province) {
              this.getDistrict()
              this.district = oldData.district
            }
            if (oldData.district) {
              this.getCommune()
              this.commune = oldData.commune
            }
            if (oldData.commune) {
              this.getVillage()
              this.village = oldData.village
            }
            if (oldData.logo) {
              this.preview_shop_logo = process.env.VUE_APP_API + '/' + oldData.logo
            }
            if (oldData.avatar) {
              this.preview_shop_owner = process.env.VUE_APP_API + '/' + oldData.avatar
            }
          }
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/scss/pages/mobile";

.mobile-content-h {
  height: calc(100vh - 113px);
}
</style>

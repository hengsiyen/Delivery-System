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
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="required">{{ $t('label.companyNameKm') }}</label>
                    <input
                      v-model="name_km"
                      type="text"
                      class="form-control"
                      :placeholder="$t('pla.nameKm')"
                      :class="{'is-invalid': checkValidate('name_km')}"
                    >
                    <div v-if="checkValidate('name_km')" class="invalid-feedback">
                      {{ validate.name_km[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="required">{{ $t('label.companyNameEn') }}</label>
                    <input
                      v-model="name_en"
                      type="text"
                      class="form-control"
                      :placeholder="$t('pla.nameEn')"
                      :class="{'is-invalid': checkValidate('name_en')}"
                    >
                    <div v-if="checkValidate('name_en')" class="invalid-feedback">
                      {{ validate.name_en[0] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="required">{{ $t('label.phone') }}</label>
                    <input
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
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="required">{{ $t('label.email') }}</label>
                    <input
                      v-model="email"
                      type="text"
                      class="form-control"
                      :placeholder="$t('pla.email')"
                      :class="{'is-invalid': checkValidate('email')}"
                    >
                    <div v-if="checkValidate('email')" class="invalid-feedback">
                      {{ validate.email[0] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>{{ $t('label.home_number') }}</label>
                    <input v-model="home_number" type="text" class="form-control" :placeholder="$t('pla.home_number')">
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>{{ $t('label.street_number') }}</label>
                    <input v-model="street_number" type="text" class="form-control" :placeholder="$t('pla.street_number')">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
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
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
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
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
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
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
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
                </div>
              </div>
              <div class="row">
                <div class="form-group col-lg-12">
                  <label for="description">
                    {{ $t('label.description') }}
                  </label>
                  <textarea
                    id="description"
                    v-model="description"
                    class="form-control overflow-auto"
                    rows="5"
                    :placeholder="$t('pla.description') + ' ...'"
                    style="max-height: 237px"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group text-center">
                <label>{{ $t('label.company_logo') }}</label>
                <template v-if="selected_image">
                  <div :style="`width: ${croppie_size}px`" class="mx-auto">
                    <vue-croppie
                      ref="croppieRef"
                      :enable-orientation="true"
                      :boundary="{ width: croppie_size, height: croppie_size}"
                      :enable-resize="false"
                      :viewport="{ width: 295, height: 295, type: 'square' }"
                      @result="result"
                    />
                    <button class="btn btn-primary btn-upload-image">
                      <i class="fas fa-link" />
                      <input
                        ref="getPackageImg"
                        type="file"
                        name="file"
                        accept="image/*"
                        @change="getImg"
                      >
                    </button>
                    <!-- Rotate angle is Number -->
                    <button class="btn btn-light" @click="rotate(-90)">
                      <i class="fas fa-undo-alt" />
                    </button>
                    <button class="btn btn-light" @click="rotate(90)">
                      <i class="fas fa-redo-alt" />
                    </button>
                    <button class="btn btn-light" @click="removePackageImg">
                      <i class="fas fa-times" />
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div
                    :style="`width: ${croppie_size}px; height: ${croppie_size}px`"
                    class="mx-auto bg-whitesmoke d-flex align-items-center justify-content-center rounded btn-upload-image border cursor-pointer"
                  >
                    <template v-if="logo">
                      <img :src="logo" class="img-thumbnail">
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
                      ref="getPackageImg"
                      type="file"
                      name="file"
                      accept="image/*"
                      class="cursor-pointer"
                      @change="getImg"
                    >
                  </div>
                </template>
                <template v-if="logo && !selected_image">
                  <p class="mt-2">
                    {{ $t('label.tap_on_image_to_edit') }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-light" @click="$router.back()">
            <i class="fas fa-times mr-2" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </button>
          <button
            class="btn"
            :class="isEdit ? 'btn-primary' : 'btn-success'"
            @click="edit"
          >
            <i class="fas fa-save mr-2" />
            <strong>{{ isEdit ? $t('btn.update') : $t('btn.save') }}</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import { mapGetters } from 'vuex'

export default {
  name: 'CompanyInfoForm',
  components: { ButtonBack },
  props: {
    title: {
      type: String,
      default: 'label.add_new'
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      validate: null,
      id: null,
      provinces: [],
      districts: [],
      communes: [],
      villages: [],

      name_km: null,
      name_en: null,
      phone: null,
      email: null,
      home_number: null,
      street_number: null,
      province: null,
      district: null,
      commune: null,
      village: null,
      description: null,

      logo: null,
      croppie_size: 300,
      cropped: null,
      selected_image: null
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    }),
    langType () {
      return this.$i18n.locale
    }
  },
  created () {
    this.getProvince()
    this.getCompanyInfo()
  },
  methods: {
    getImg (event) {
      const self = this
      const file = event.target.files[0]
      const reader = new FileReader()
      this.selected_image = file
      reader.onload = function (e) {
        if (self.$refs.croppieRef) {
          self.$refs.croppieRef.bind({
            url: e.target.result
          })
        }
      }
      reader.readAsDataURL(file)
    },
    crop () {
      const options = {
        format: 'png',
        circle: false
      }
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = output
      })
    },
    result (output) {
      this.cropped = output
    },
    rotate (rotationAngle) {
      this.$refs.croppieRef.rotate(rotationAngle)
    },
    removePackageImg () {
      this.cropped = null
      this.selected_image = null
      this.$refs.croppieRef.refresh()
    },

    checkValidate (key) {
      return this.validate && this.validate.hasOwnProperty(key)
    },
    getCompanyInfo () {
      this.$isLoading(true)
      this.$axios.post(this.$base_api + '/api/backend/delivery-company/show', {
        dcid: this.dcid
      }).then((res) => {
        const result = res.data.data
        if (result) {
          this.name_en = result.name_en
          this.name_km = result.name_km
          this.phone = result.phone
          this.email = result.email
          this.home_number = result.home_number
          this.street_number = result.street_number
          this.province = result.province
          if (this.province) { this.getDistrict() }
          this.district = result.district
          if (this.district) { this.getCommune() }
          this.commune = result.commune
          if (this.commune) { this.getVillage() }
          this.village = result.village
          this.description = result.description
          if (result.logo) {
            this.logo = this.getSrc(result.logo)
          }
        }
      }).catch((error) => {
        this.onResponseError(error)
      }).finally(() => {
        this.$isLoading(false)
      })
    },
    edit () {
      this.validate = null
      this.$isLoading(true)
      if (this.selected_image) {
        this.crop()
      }
      setTimeout(() => {
        const formData = new FormData()
        if (this.dcid) { formData.append('id', this.dcid) }
        if (this.name_km) { formData.append('name_km', this.name_km) }
        if (this.name_en) { formData.append('name_en', this.name_en) }
        if (this.phone) { formData.append('phone', this.phone) }
        if (this.email) { formData.append('email', this.email) }
        if (this.home_number) { formData.append('home_number', this.home_number) }
        if (this.street_number) { formData.append('street_number', this.street_number) }
        if (this.province) { formData.append('province_id', this.province._id) }
        if (this.district) { formData.append('district_id', this.district._id) }
        if (this.commune) { formData.append('commune_id', this.commune._id) }
        if (this.village) { formData.append('village_id', this.village._id) }
        if (this.description) { formData.append('description', this.description) }
        if (this.cropped) { formData.append('logo', this.cropped) }
        this.$axios.post(this.$base_api + '/api/backend/delivery-company/edit', formData)
          .then((res) => {
            const deliveryCompany = res.data.data
            if (deliveryCompany) {
              this.$store.dispatch('delivery_company/setDeliveryCompany', deliveryCompany)

              this.$cookies.set('dc_currency', JSON.stringify(deliveryCompany.currency))
              this.$cookies.set('dc_exchange', JSON.stringify(deliveryCompany.exchange_rate_enabled))
              this.$store.dispatch('delivery_company/setCurrency', deliveryCompany.currency)
              this.$store.dispatch('delivery_company/setExchangeRate', deliveryCompany.exchange_rate_enabled)
            }
            this.$router.push({ name: 'show-company-info' })
          }).catch((error) => {
            if (error.response.status === 422) {
              this.validate = error.response.data.errors
            } else {
              this.onResponseError(error)
            }
          }).finally(() => {
            this.$isLoading(false)
          })
      }, 1000)
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

<style scoped>

</style>

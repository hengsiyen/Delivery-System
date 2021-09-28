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
                  <label class="required" :class="{'text-red': checkValidate('name_en')}">
                    {{ $t('label.nameEn') }}
                  </label>
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
                <div class="form-group col-lg-6">
                  <label :class="{'text-red': checkValidate('name_km')}">
                    {{ $t('label.nameKm') }}
                  </label>
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
              <div class="form-row">
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
                <div class="form-group col-lg-3">
                  <label>{{ $t('label.home_number') }}</label>
                  <input
                    id="home_number"
                    v-model="home_number"
                    type="text"
                    class="form-control"
                    :placeholder="$t('pla.home_number')"
                  >
                </div>
                <div class="form-group col-lg-3">
                  <label>{{ $t('label.street_number') }}</label>
                  <input
                    id="street_number"
                    v-model="street_number"
                    type="text"
                    class="form-control"
                    :placeholder="$t('pla.street_number')"
                  >
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-lg-6">
                  <label>
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
                  <label>{{ $t('menu.district') }}</label>
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
              <div class="form-row">
                <div class="form-group col-lg-6">
                  <label>{{ $t('menu.commune') }}</label>
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
                  <label>{{ $t('menu.village') }}</label>
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
              <div class="form-row">
                <div class="form-group col-lg-12">
                  <label for="description">{{ $t('label.description') }}</label>
                  <textarea
                    id="description"
                    v-model="description"
                    class="form-control overflow-auto"
                    rows="10"
                    :placeholder="$t('pla.description') + ' ...'"
                    style="max-height: 237px"
                  />
                </div>
              </div>
              <div class="form-row">
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
              <div class="form-group text-center">
                <label>{{ $t('label.image') }}</label>
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
                        ref="bindImg"
                        type="file"
                        name="file"
                        accept="image/*"
                        @change="bindImg"
                      >
                    </button>
                    <!-- Rotate angle is Number -->
                    <button class="btn btn-light" @click="rotate(-90)">
                      <i class="fas fa-undo-alt" />
                    </button>
                    <button class="btn btn-light" @click="rotate(90)">
                      <i class="fas fa-redo-alt" />
                    </button>
                    <button class="btn btn-light" @click="removeImg">
                      <i class="fas fa-times" />
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div
                    :style="`width: ${croppie_size}px; height: ${croppie_size}px`"
                    class="mx-auto bg-whitesmoke d-flex align-items-center justify-content-center rounded btn-upload-image border cursor-pointer"
                  >
                    <template v-if="isEdit && preview_img">
                      <img :src="getSrc(preview_img.src)" class="img-thumbnail">
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
                      ref="bindImg"
                      type="file"
                      name="file"
                      accept="image/*"
                      class="cursor-pointer"
                      @change="bindImg"
                    >
                  </div>
                </template>
                <template v-if="isEdit && preview_img && !selected_image">
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
import { mapGetters } from 'vuex'
export default {
  name: 'PartnerCompanyForm',
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
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    })
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
      name_en: null,
      name_km: null,
      phone: null,
      home_number: null,
      street_number: null,
      province: null,
      district: null,
      commune: null,
      village: null,
      description: null,
      enabled: true,
      preview_img: null,

      croppie_size: 300,
      cropped: null,
      selected_image: null
    }
  },
  mounted () {
    this.getProvince()
    if (this.$route.params.id) {
      this.getPartnerCompany()
    }
  },
  methods: {
    checkValidate (key) {
      if (key) {
        return this.validate && this.validate.hasOwnProperty(key)
      }
      return false
    },
    storeOrEdit () {
      this.validate = null
      if (this.selected_image) {
        this.crop()
      }
      setTimeout(() => {
        const data = new FormData()
        if (this.$route.params.id) { data.append('id', this.$route.params.id) }
        if (this.name_en) { data.append('name_en', this.name_en) }
        if (this.name_km) { data.append('name_km', this.name_km) }
        if (this.phone) { data.append('phone', this.phone) }
        if (this.home_number) { data.append('home_number', this.home_number) }
        if (this.street_number) { data.append('street_number', this.street_number) }
        if (this.province) { data.append('province_id', this.province._id) }
        if (this.district) { data.append('district_id', this.district._id) }
        if (this.commune) { data.append('commune_id', this.commune._id) }
        if (this.village) { data.append('village_id', this.village._id) }
        if (this.description) { data.append('description', this.description) }
        if (this.enabled) { data.append('enabled', this.enabled) }
        if (this.cropped) { data.append('image', this.cropped) }
        this.$axios.post(this.$base_api + '/api/backend/third-party-company/store-or-edit', data)
          .then((res) => {
            this.$router.push({ name: 'list-partner-company' })
          }).catch((error) => {
            if (error.response.status === 422) {
              this.validate = error.response.data.errors
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
    getPartnerCompany () {
      this.$axios.post(this.$base_api + '/api/backend/third-party-company/show', {
        dcid: this.dcid,
        id: this.$route.params.id
      }).then((res) => {
        const pc = res.data.data
        this.name_en = pc.name_en
        this.name_km = pc.name_km
        this.home_number = pc.home_number
        this.street_number = pc.street_number
        this.description = pc.description
        this.enabled = pc.enabled
        this.phone = pc.phone
        this.preview_img = pc.media
        if (pc.province) {
          this.province = pc.province
        }
        if (pc.province) {
          this.getDistrict()
          this.district = pc.district
        }
        if (pc.district) {
          this.getCommune()
          this.commune = pc.commune
        }
        if (pc.commune) {
          this.getVillage()
          this.village = pc.village
        }
      }).catch((error) => {
        this.onResponseError(error)
      })
    },

    bindImg (event) {
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
    removeImg () {
      this.cropped = null
      this.selected_image = null
      this.$refs.croppieRef.refresh()
    }
  }
}
</script>

<style scoped>

</style>

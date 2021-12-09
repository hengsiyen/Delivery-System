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
            <div class="col-lg-12">
              <div class="form-group row">
                <label class="required col-lg-3 col-form-label text-lg-right">{{ $t('label.nameKm') }}</label>
                <div class="col-lg-9">
                  <input
                    v-model="name_km"
                    type="text"
                    class="form-control"
                    :class="{'is-invalid': checkValidate('name_km')}"
                    :placeholder="$t('pla.nameKm')"
                  >
                  <small v-if="checkValidate('name_km')" class="invalid-feedback">
                    {{ validate.name_km[0] }}
                  </small>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="form-group row">
                <label class="required col-lg-3 col-form-label text-lg-right">{{ $t('label.nameEn') }}</label>
                <div class="col-lg-9">
                  <input
                    v-model="name_en"
                    type="text"
                    class="form-control"
                    :class="{'is-invalid': checkValidate('name_en')}"
                    :placeholder="$t('pla.nameEn')"
                  >
                  <small v-if="checkValidate('name_en')" class="invalid-feedback">
                    {{ validate.name_en[0] }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group row">
                <label class="col-lg-3 col-form-label text-lg-right">{{ $t('label.active') }}</label>
                <div class="col-lg-9">
                  <toggle-button
                    class="mb-0"
                    :value="enabled"
                    color="#1876f2"
                    :sync="true"
                    :width="$i18n.locale === 'km' ? 135 : 95"
                    :height="30"
                    :font-size="16"
                    :labels="{checked: $t('label.enable'), unchecked: $t('label.disable')}"
                    @change="toggleEnabled"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-light" @click="$router.back()">
            <i class="fas fa-times-circle mr-2" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </button>
          <button
            class="btn"
            :class="isEdit ? 'btn-primary' : 'btn-success'"
            @click="storeOrEdit"
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
  name: 'GenderForm',
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
      name_en: null,
      name_km: null,
      enabled: true
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    })
  },
  created () {
    if (this.isEdit && this.$route.params.id) {
      this.getGender()
    }
  },
  methods: {
    checkValidate (key) {
      return this.validate && this.validate.hasOwnProperty(key)
    },
    toggleEnabled () {
      this.enabled = !this.enabled
    },
    storeOrEdit () {
      this.$isLoading(true)
      this.validate = null
      this.$axios.post(this.$base_api + '/api/backend/gender/store-or-edit', {
        id: this.id,
        name_en: this.name_en,
        name_km: this.name_km,
        enabled: this.enabled,
        dcid: this.dcid
      }).then((res) => {
        this.$router.push({ name: 'list-gender' })
      }).catch((error) => {
        if (error.response.status === 422) {
          this.validate = error.response.data.errors
        } else {
          this.onResponseError(error)
        }
      }).finally(() => {
        this.$isLoading(false)
      })
    },
    getGender () {
      this.$axios
        .post(this.$base_api + '/api/backend/gender/show', {
          id: this.$route.params.id
        })
        .then((res) => {
          this.oldData = res.data.data
          this.id = this.oldData._id
          this.name_en = this.oldData.name_en
          this.name_km = this.oldData.name_km
          this.enabled = this.oldData.enabled
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped>

</style>

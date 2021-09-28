<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink
              class="btn btn-primary btn-sm"
              :to="{name: 'edit-partner-company', params: {id: this.$route.params.id}}"
            >
              <i class="fas fa-edit mr-1" />
              <strong>{{ $t('button.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div class="card-body shop-card_body">
          <div v-if="partner_company" class="row">
            <div class="col-lg-8 col-xl-9">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <th>{{ $t('label.nameEn') }}</th>
                    <td>{{ partner_company.name_en }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.nameKm') }}</th>
                    <td>{{ partner_company.name_km ? partner_company.name_km : '-' }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.phone') }}</th>
                    <td>{{ partner_company.phone }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.code') }}</th>
                    <td>{{ partner_company.code }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.address') }}</th>
                    <td>{{ partner_company['address_' + $i18n.locale] ? partner_company['address_' + $i18n.locale] : '-' }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.status') }}</th>
                    <td>
                      <div class="badge" :class="partner_company.enabled ? 'badge-success' : 'badge-danger'">
                        <span v-if="partner_company.enabled">{{ $t('label.enabled') }}</span>
                        <span v-else>{{ $t('label.disabled') }}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.number_packages_delivery') }}</th>
                    <td>
                      <strong>{{ partner_company.count_package }} {{ partner_company.count_package > 1 ? $t('unit.packages') : $t('unit.package') }}</strong>
                    </td>
                  </tr>
                  <tr v-if="partner_company.description">
                    <th>{{ $t('label.description') }}</th>
                    <td>{{ partner_company.description }}</td>
                  </tr>
                  <tr v-if="partner_company.creator">
                    <th>{{ $t('label.createBy') }}</th>
                    <td>{{ partner_company.creator.full_name }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.createdAt') }}</th>
                    <td>{{ getDateFormat(partner_company.created_at) }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.updatedAt') }}</th>
                    <td>{{ getDateFormat(partner_company.updated_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-4 col-xl-3 shop-info-block">
              <div class="w-300px mx-auto text-center">
                <label>{{ $t('label.image') }}</label>
                <template v-if="partner_company.media">
                  <img :src="getSrc(partner_company.media.src)" alt="" class="img-thumbnail">
                </template>
                <template v-else>
                  <img :src="shop_img" alt="" class="img-thumbnail">
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonBack from '@/components/UiElements/ButtonBack'

export default {
  name: 'PartnerCompanyShow',
  components: { ButtonBack },
  head () {
    return {
      title: this.$t('title.showPartnerCompany'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    })
  },
  data () {
    return {
      partner_company: null
    }
  },
  mounted () {
    this.getPartnerCompany()
  },
  methods: {
    getPartnerCompany () {
      this.$axios.post(this.$base_api + '/api/backend/third-party-company/show', {
        dcid: this.dcid,
        id: this.$route.params.id
      }).then((res) => {
        this.partner_company = res.data.data
      }).catch((error) => {
        this.onResponseError(error)
      })
    }
  }
}
</script>

<style scoped>

</style>

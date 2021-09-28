<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <template v-if="allowedEdit">
              <NuxtLink
                class="btn btn-primary btn-sm"
                :to="{name: 'edit-package', params: {id: this.$route.params.id}}"
              >
                <i class="fas fa-edit mr-1" />
                <strong>{{ $t('button.edit') }}</strong>
              </NuxtLink>
            </template>
            <ButtonBack />
          </div>
        </div>
        <div class="card-body">
          <template v-if="package_data">
            <div class="row">
              <div class="col-xl-12 d-flex">
                <div class="package__content">
                  <template v-if="package_data.package_transitions && package_data.package_transitions.length">
                    <div class="package_transition mb-4">
                      <div class="timeline" :class="toggle_timeline ? 'show-timeline' : 'hide-timeline'">
                        <template v-for="(item, key) in package_data.package_transitions">
                          <div :key="key">
                            <i class="fas" :class="statusIcon(item)" />
                            <div class="timeline-item shadow-none">
                              <div class="text-dark">
                                <strong>{{ checkStatus(item.status) }}</strong>
                              </div>
                              <div><small>{{ item.description[$i18n.locale] }}</small></div>
                              <div><small>{{ $moment(item.created_at).format('llll') }}</small></div>
                            </div>
                          </div>
                        </template>
                        <div>
                          <i class="fas fa-clock bg-gray" />
                        </div>
                      </div>
                      <div>
                        <button class="btn btn-default" @click="toggle_timeline = !toggle_timeline">
                          <i class="mr-2 fas" :class="toggle_timeline ? 'fa-chevron-up' : 'fa-chevron-down'" />
                          <strong v-if="toggle_timeline">{{ $t('label.view_package_transitions') }}</strong>
                          <strong v-else>{{ $t('label.hide_package_transitions') }}</strong>
                        </button>
                      </div>
                    </div>
                  </template>
                  <div class="row">
                    <div class="col-lg-8 pr-4">
                      <template>
                        <div v-if="edit_cn" class="row">
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label>{{ $t('label.customer_name') }}</label>
                              <input
                                id="customer_name"
                                v-model="customer_name"
                                name="customer_name"
                                class="form-control"
                                :placeholder="$t('pla.customer_name')"
                              >
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label class="required">{{ $t('label.customer_phone') }}</label>
                              <input
                                id="customer_phone"
                                v-model="customer_phone"
                                v-mask="'### ### ####'"
                                name="customer_phone"
                                class="form-control mb-3"
                                :placeholder="$t('pla.customer_phone')"
                                :class="{'is-invalid': checkValidate('customer_phone')}"
                              >
                              <div v-if="checkValidate('customer_phone')" class="invalid-feedback">
                                {{ validate.customer_phone[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label class="required">{{ $t('label.customer_address') }}</label>
                              <input
                                id="customer_address"
                                v-model="customer_address"
                                name="customer_address"
                                class="form-control mb-3"
                                :placeholder="$t('pla.customer_address')"
                                :class="{'is-invalid': checkValidate('customer_address')}"
                              >
                              <div v-if="checkValidate('customer_address')" class="invalid-feedback">
                                {{ validate.customer_address[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <PackageFormItemButton
                              :disabled-button="checkDataChange(customer_name, old_cn) && checkDataChange(customer_phone, old_cp) && checkDataChange(customer_address, old_ca)"
                              @onClickCancel="cancelCn"
                              @onClickSave="editPackage('customer_info')"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div class="form-group show-with-border">
                            <label>{{ $t('label.customer_info') }}</label>
                            <div class="d-flex align-items-center justify-content-between">
                              <div class="d-flex align-items-center">
                                <div class="package_form-customer-img">
                                  <img :src="avatar" class="img-thumbnail">
                                </div>
                                <div class="package_form-item-content">
                                  <div class="package_form-item-content-label w-100 text-truncate">
                                    <label class="mb-0">{{ customer_name }}</label>
                                  </div>
                                  <div>
                                    <small class="text-muted">
                                      <span class="d-block">{{ customer_phone }}</span>
                                      <span class="d-block">{{ customer_address }}</span>
                                    </small>
                                  </div>
                                </div>
                              </div>
                              <div v-if="allowedEdit" class="package_form-item-edit text-right">
                                <button class="btn btn-light pr-0" @click="edit_cn = true">
                                  <i class="fas fa-edit mr-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <template>
                        <div v-if="edit_price" class="row">
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label>{{ $t('label.price') }}</label>
                              <div class="input-group">
                                <template v-if="currencies && currencies.length">
                                  <template v-if="currencies.length < 3">
                                    <div id="button-price" class="input-group-prepend">
                                      <button
                                        v-for="(item, key) in currencies"
                                        :key="key"
                                        class="btn"
                                        type="button"
                                        :class="currency && item._id === currency._id ? 'btn-primary' : 'input-group-text'"
                                        @click="currency = item"
                                      >
                                        {{ item.code }}
                                      </button>
                                    </div>
                                  </template>
                                  <template v-else>
                                    <select v-model="currency" class="custom-select w-25">
                                      <template v-for="(item, key) in currencies">
                                        <option :key="key" :value="item">
                                          {{ item.code }}
                                        </option>
                                      </template>
                                    </select>
                                  </template>
                                </template>
                                <input
                                  id="price"
                                  v-model="price"
                                  name="price"
                                  type="number"
                                  class="form-control"
                                  :placeholder="$t('pla.package_price')"
                                  aria-describedby="button-price"
                                  :class="{'is-invalid': checkValidate('price'), 'w-75': currencies.length > 2}"
                                >
                                <div v-if="checkValidate('price')" class="invalid-feedback">
                                  {{ validate.price[0] }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label>{{ $t('label.is_paid') }}</label>
                              <div class="input-group">
                                <div :class="is_paid ? 'input-group-prepend' : 'btn-group' ">
                                  <button
                                    class="btn"
                                    :class="!is_paid ? 'btn-primary' : 'input-group-text'"
                                    @click="paymentOnDelivery"
                                  >
                                    {{ $t('btn.is_paid_no') }}
                                  </button>
                                  <button
                                    class="btn"
                                    :class="is_paid ? 'btn-primary' : 'input-group-text'"
                                    @click="is_paid = true"
                                  >
                                    {{ $t('btn.is_paid_yes') }}
                                  </button>
                                </div>
                                <select
                                  v-if="payment_types && is_paid"
                                  id="payment_type"
                                  v-model="payment_type"
                                  name="package_type"
                                  class="custom-select"
                                >
                                  <option :value="null" selected hidden>
                                    {{ $t('label.select_one_option') }} ...
                                  </option>
                                  <template v-for="(item, key) in payment_types">
                                    <option :key="key" :value="item">
                                      {{ item['name_' + $i18n.locale] }}
                                    </option>
                                  </template>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <PackageFormItemButton
                              :disabled-button="checkDataChange(price, old_price) && checkDataChange(currency._id, old_currency._id) && checkIsPaidUpdate"
                              @onClickCancel="cancelPrice"
                              @onClickSave="editPackage('payment')"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div class="form-group show-with-border">
                            <label class="customer-mb-12">{{ $t('label.payment') }}</label>
                            <div class="d-flex align-items-center justify-content-between">
                              <div class="d-flex align-items-center">
                                <div class="package_form-item-content">
                                  <div class="package_form-item-content-label w-100 text-truncate">
                                    <i class="fas fa-money-bill mr-2" />
                                    <label>{{ currency ? price + ' ' + currency.code : price }}</label>
                                  </div>
                                  <div class="package_form-item-content-label w-100 text-truncate">
                                    <i class="fas fa-cash-register mr-2" />
                                    <label>{{ displayIsPaidLabel }}</label>
                                  </div>
                                </div>
                              </div>
                              <div v-if="allowedEdit" class="package_form-item-edit text-right">
                                <button class="btn btn-light pr-0" @click="edit_price = true">
                                  <i class="fas fa-edit mr-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <template>
                        <div v-if="edit_note" class="row">
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label>{{ $t('menu.package_type') }}</label>
                              <select
                                v-if="payment_types"
                                id="package_type"
                                v-model="package_type"
                                name="package_type"
                                class="custom-select"
                              >
                                <option :value="null" selected hidden>
                                  {{ $t('label.select_one_option') }} ...
                                </option>
                                <template v-for="(item, key) in package_types">
                                  <option :key="key" :value="item">
                                    {{ item['name_' + $i18n.locale] }}
                                  </option>
                                </template>
                              </select>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label class="text-capitalize">{{ $t('label.delivery_date') }}</label>
                              <date-picker
                                v-model="request_delivery_at"
                                value-type="format"
                                type="datetime"
                                :time-picker-options="{start: '06:00', step:'00:30' , end: '23:00', format: 'hh:mm A' }"
                                :show-second="false"
                                :placeholder="$t('string.select_date')"
                                :lang="datePickerLang"
                                :format="show_date_format"
                                input-class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label>{{ $t('label.note') }}</label>
                              <textarea
                                id="note"
                                v-model="note"
                                rows="3"
                                name="note"
                                class="form-control"
                                :placeholder="$t('pla.note')"
                              />
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <PackageFormItemButton
                              :disabled-button="checkDataChange(note, old_note) && checkDataChange(request_delivery_at, old_rda) && checkDataChange(package_type ? package_type._id : null, old_pt ? old_pt._id : null)"
                              @onClickCancel="cancelNote"
                              @onClickSave="editPackage('remark')"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div class="form-group show-with-border">
                            <label class="customer-mb-12">{{ $t('label.remark') }}</label>
                            <div class="d-flex align-items-center justify-content-between">
                              <div class="d-flex align-items-center">
                                <div class="package_form-item-content">
                                  <div v-if="package_type" class="package_form-item-content-label w-100 text-truncate">
                                    <i class="fas fa-cube mr-2" />
                                    <label>{{ package_type['name_' + $i18n.locale] }}</label>
                                  </div>
                                  <div
                                    v-if="request_delivery_at"
                                    class="package_form-item-content-label w-100 text-truncate"
                                  >
                                    <i class="far fa-calendar-check mr-2" />
                                    <label>{{ request_delivery_at }}</label>
                                  </div>
                                  <div v-if="note" class="package_form-item-content-label w-100 text-truncate">
                                    <i class="fas fa-sticky-note mr-2" />
                                    <label>{{ note }}</label>
                                  </div>
                                </div>
                              </div>
                              <div v-if="allowedEdit" class="package_form-item-edit text-right">
                                <button class="btn btn-light pr-0" @click="edit_note = true">
                                  <i class="fas fa-edit mr-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <div class="form-group show-with-border">
                        <label>{{ $t('label.shop') }}</label>
                        <div v-if="shop" class="d-flex align-items-center justify-content-between">
                          <div class="d-flex align-items-center">
                            <div class="package_form-customer-img">
                              <template v-if="shop.logo">
                                <img :src="getSrc(shop.logo)" class="img-thumbnail">
                              </template>
                              <template v-else>
                                <img :src="shop_img" class="img-thumbnail">
                              </template>
                            </div>
                            <div class="package_form-item-content">
                              <div class="package_form-item-content-label w-100 text-truncate">
                                <NuxtLink :to="{name: 'show-shop', params: {id: shop._id}}" class="mb-0 text-bold">
                                  {{ shop.name_en }}
                                </NuxtLink>
                              </div>
                              <div>
                                <small class="text-muted">
                                  <span class="d-block">{{ shop.phone }}</span>
                                </small>
                              </div>
                            </div>
                          </div>
                          <div v-if="allowedEdit" class="package_form-item-edit text-right">
                            <button class="btn btn-light pr-0" @click="openShopModal">
                              <i class="fas fa-edit mr-2" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="form-group show-with-border">
                        <label>{{ $t('label.delivery_with_other_company') }}</label>
                        <div v-if="third_party" class="d-flex align-items-center justify-content-between">
                          <div class="d-flex align-items-center">
                            <div class="package_form-customer-img">
                              <img :src="shop_img" class="img-thumbnail">
                            </div>
                            <div class="package_form-item-content">
                              <div class="package_form-item-content-label w-100 text-truncate">
                                <label class="mb-0">
                                  {{ third_party.name_en }}
                                </label>
                              </div>
                              <div>
                                <small class="text-muted">
                                  <span class="d-block">{{ third_party.phone }}</span>
                                </small>
                              </div>
                            </div>
                          </div>
                          <div v-if="allowedEdit" class="package_form-item-edit text-right">
                            <button class="btn btn-light pr-0" @click="openThirdPartyModal">
                              <i class="fas fa-edit mr-2" />
                            </button>
                            <button class="btn btn-light pr-0 text-red" @click="removeThirdParty">
                              <i class="fas fa-trash-alt mr-2" />
                            </button>
                          </div>
                        </div>
                        <div v-else>
                          <template v-if="allowedEdit">
                            <button class="btn btn-link btn-sm" @click="openThirdPartyModal">
                              <i class="fas fa-plus-circle mr-2" />
                              {{ $t('label.select_third_party_company') }}
                            </button>
                          </template>
                          <template v-else>
                            <label class="font-weight-normal">
                              {{ $t('label.no_select_third_party_company') }}
                            </label>
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="form-group text-center">
                        <label>{{ $t('label.package_image') }}</label>
                        <template v-if="selected_image">
                          <div class="mx-auto" :style="`width: ${croppie_size}px`">
                            <vue-croppie
                              ref="croppieRef"
                              :enable-orientation="true"
                              :boundary="{ width: croppie_size, height: croppie_size}"
                              :enable-resize="false"
                              :viewport="{ width: 295, height: 295, type: 'square' }"
                              @result="result"
                            />
                            <button
                              class="btn btn-light"
                              :class="{'disabled': onUpload}"
                              :disabled="onUpload"
                              @click="removePackageImg"
                            >
                              <i class="fas fa-times" />
                            </button>
                            <!-- Rotate angle is Number -->
                            <button
                              class="btn btn-light"
                              :class="{'disabled': onUpload}"
                              :disabled="onUpload"
                              @click="rotate(-90)"
                            >
                              <i class="fas fa-undo-alt" />
                            </button>
                            <button
                              class="btn btn-light"
                              :class="{'disabled': onUpload}"
                              :disabled="onUpload"
                              @click="rotate(90)"
                            >
                              <i class="fas fa-redo-alt" />
                            </button>
                            <button
                              class="btn btn-primary btn-upload-image"
                              :class="{'disabled': onUpload}"
                              :disabled="onUpload"
                            >
                              <i class="fas fa-link" />
                              <template v-if="!onUpload">
                                <input ref="getPackageImg" type="file" name="file" accept="image/*" @change="getPackageImg">
                              </template>
                            </button>
                            <button
                              class="btn btn-success"
                              :class="{'disabled': onUpload}"
                              :disabled="onUpload"
                              @click="uploadImage"
                            >
                              <template v-if="onUpload">
                                <i class="fas fa-circle-notch fa-spin" />
                              </template>
                              <template v-else>
                                <i class="fas fa-save" />
                              </template>
                            </button>
                          </div>
                        </template>
                        <template v-else>
                          <div
                            :style="`width: ${croppie_size}px; height: ${croppie_size}px`"
                            class="mx-auto bg-whitesmoke d-flex align-items-center justify-content-center rounded btn-upload-image border cursor-pointer"
                          >
                            <template v-if="package_data && package_data.media">
                              <img :src="`${$base_api}/${package_data.media.src}`" class="img-thumbnail">
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
                              @change="getPackageImg"
                            >
                          </div>
                        </template>
                        <template v-if="package_data && package_data.media && !selected_image">
                          <p class="mt-2">
                            {{ $t('label.tap_on_image_to_edit') }}
                          </p>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="package__active">
                  <button
                    type="button"
                    class="btn btn-default btn-block"
                    data-toggle="modal"
                    data-target="#packageHistoryModal"
                  >
                    <i class="fas fa-history mr-2" />
                    <strong>{{ $t('label.package_history') }}</strong>
                  </button>
                  <template v-if="showBtnCancel">
                    <button
                      type="button"
                      class="btn btn-default btn-block text-green"
                      data-toggle="modal"
                      data-target="#completePackageModal"
                    >
                      <i class="fas fa-map-marker-alt mr-2" />
                      <strong>{{ $t('btn.complete') }}</strong>
                    </button>
                  </template>
                  <template v-if="showButtonAssign">
                    <button
                      type="button"
                      class="btn btn-default btn-block"
                      data-toggle="modal"
                      data-target="#driverModal"
                      @click="openDriverModal"
                    >
                      <i class="fas fa-user-plus mr-2" />
                      <strong>
                        {{ package_data && package_data.driver_id ? $t('btn.change_driver') : $t('btn.assign') }}
                      </strong>
                    </button>
                  </template>
                  <template v-if="showBtnDelay">
                    <button
                      type="button"
                      class="btn btn-default btn-block"
                      data-toggle="modal"
                      data-target="#delayModal"
                    >
                      <i class="fas fa-truck mr-2" />
                      <strong>{{ $t('btn.delay') }}</strong>
                    </button>
                    <template v-if="showBtnCancel">
                      <button
                        type="button"
                        class="btn btn-default btn-block text-red"
                        data-toggle="modal"
                        data-target="#cancelModal"
                      >
                        <i class="far fa-times-circle mr-2" />
                        <strong>{{ $t('btn.cancel') }}</strong>
                      </button>
                      <button
                        type="button"
                        class="btn btn-default btn-block text-red"
                        data-toggle="modal"
                        data-target="#returnModal"
                      >
                        <i class="fas fa-share fa-flip-vertical mr-2" />
                        <strong>{{ $t('btn.return') }}</strong>
                      </button>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <PackageHistoryModal :package-history="package_data ? package_data.package_histories : []" />
    <div
      id="shopModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <ShopModal
        ref="shopModal"
        :close-with-emit="true"
        @closeModel="cancelShop"
        @confirmModel="editPackage('shop')"
      />
    </div>
    <div
      id="thirdPartyCompanyModal"
      class="modal fade"
      data-backdrop="static"
      tabindex="-1"
    >
      <ThirdPartyCompanyModal
        ref="thirdPartyCompanyModal"
        :close-with-emit="true"
        @closeModel="cancelThirdParty"
        @confirmModel="editPackage('delivery_partner')"
      />
    </div>
    <div
      id="completePackageModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <CompletePackageModel
        :payment-types="payment_types"
        :package-id="$route.params.id"
        @onSubmit="getDataFromChild"
      />
    </div>
    <div
      id="driverModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <AssignDriverModal
        ref="driverModal"
        :package-data="package_data"
        :currencies="currencies"
        @onSubmit="getDataFromChild"
      />
    </div>
    <div
      id="delayModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <DelayPackageModal
        ref="delayPackageModal"
        :package-data="package_data"
        @onSubmit="getDataFromChild"
      />
    </div>
    <div
      id="cancelModal"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
    >
      <CancelPackageModal
        ref="cancelPackageModal"
        :package-id="$route.params.id"
        @onSubmit="getDataFromChild"
      />
    </div>
    <div
      id="returnModal"
      class="modal fade"
      data-backdrop="static"
      tabindex="-1"
    >
      <ReturnPackageModal
        ref="returnPackageModal"
        :package-id="$route.params.id"
        @onSubmit="getDataFromChild"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonBack from '@/components/UiElements/ButtonBack'
import PackageHistoryModal from '@/pages/admin/package/_components/PackageHistoryModal'
import PackageFormItemButton from '@/pages/admin/package/_components/PackageFormItemButton'
import ShopModal from '@/pages/admin/package/_components/ShopModal'
import ThirdPartyCompanyModal from '@/pages/admin/package/_components/ThirdPartyCompanyModal'
import CompletePackageModel from '@/pages/admin/package/_components/CompletePackageModel'
import AssignDriverModal from '@/pages/admin/package/_components/AssignDriverModal'
import DelayPackageModal from '@/pages/admin/package/_components/DelayPackageModal'
import CancelPackageModal from '@/pages/admin/package/_components/CancelPackageModal'
import ReturnPackageModal from '@/pages/admin/package/_components/ReturnPackageModal'

export default {
  name: 'PackageShow',
  components: {
    ReturnPackageModal,
    CancelPackageModal,
    DelayPackageModal,
    AssignDriverModal,
    CompletePackageModel,
    ThirdPartyCompanyModal,
    ShopModal,
    PackageFormItemButton,
    PackageHistoryModal,
    ButtonBack
  },
  created () {
    this.setDataPackage()
  },
  computed: {
    ...mapGetters({
      shop: 'package/shop',
      third_party: 'package/third_party',
      dc: 'delivery_company/delivery_company'
    }),
    allowedEdit () {
      return this.package_data && this.package_data.final_status !== 'success'
    },
    checkIsPaidUpdate () {
      let pyid = null
      let oldpyid = null
      if (this.payment_type) {
        pyid = this.payment_type._id
      }
      if (this.old_pyt) {
        oldpyid = this.old_pyt._id
      }
      return this.checkDataChange(pyid, oldpyid) && this.checkDataChange(this.is_paid, this.old_ip)
    },
    displayIsPaidLabel () {
      let a = null
      let b = null
      this.is_paid ? a = this.$t('label.payment_with_order') : a = this.$t('label.payment_on_delivery')
      this.payment_type ? b = this.payment_type['name_' + this.$i18n.locale] : b = null
      if (b) {
        return a + ' ( ' + b + ')'
      }
      return a
    },
    showButtonAssign () {
      const hiddenStatus = [
        'delivery',
        'success',
        'return'
      ]
      if (this.package_data) {
        return !hiddenStatus.includes(this.package_data.final_status)
      }
      return true
    },
    showBtnDelay () {
      const hiddenStatus = [
        'success',
        'return'
      ]
      if (this.package_data) {
        return !hiddenStatus.includes(this.package_data.final_status)
      }
      return true
    },
    showBtnCancel () {
      const hiddenStatus = [
        'success',
        'cancel',
        'return'
      ]
      if (this.package_data) {
        return !hiddenStatus.includes(this.package_data.final_status)
      }
      return true
    }
  },
  data () {
    return {
      show_date_format: 'DD/MM/YYYY hh:mm A',
      package_data: null,
      validate: null,
      currencies: [],
      package_types: [],
      payment_types: [],

      toggle_timeline: false,
      edit_cn: false,
      edit_cp: false,
      edit_price: false,
      edit_note: false,

      old_cn: null,
      old_cp: null,
      old_ca: null,
      old_note: null,
      old_shop: null,
      old_price: null,
      old_currency: null,
      old_pt: null,
      old_rda: null,
      old_pyt: null,
      old_ip: false,
      old_third_party: null,

      customer_name: null,
      customer_phone: null,
      customer_address: null,
      note: null,
      price: null,
      currency: null,
      package_type: null,
      request_delivery_at: null,
      payment_type: null,
      is_paid: false,

      croppie_size: 300,
      cropped: null,
      selected_image: null,
      onUpload: false
    }
  },
  mounted () {
    this.getFetchData()
    this.getPackageData()
  },
  methods: {
    getPackageData () {
      this.$axios
        .post(this.$base_api + '/api/backend/package/show', {
          id: this.$route.params.id
        })
        .then((res) => {
          this.package_data = res.data.data
          this.setDataPackage()
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    checkValidate (key) {
      if (key) {
        return this.validate && this.validate.hasOwnProperty(key)
      }
      return false
    },
    paymentOnDelivery () {
      this.is_paid = false
      this.payment_type = null
    },
    getFetchData () {
      this.$axios
        .get(process.env.VUE_APP_API + '/api/backend/fetch-data/data-for-package')
        .then((res) => {
          const result = res.data.data
          this.currencies = result.currencies
          this.package_types = result.package_types
          this.payment_types = result.payment_types
          if (this.currencies.length && this.dc && this.dc.currency) {
            this.currency = this.currencies.find((item) => {
              if (item.code === this.dc.currency.code) {
                return item
              }
              return null
            })
          }
          if (!this.package_type && this.package_types.length) {
            this.package_type = this.package_types[0]
          }
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    openShopModal () {
      if (this.$refs.shopModal) {
        this.$refs.shopModal.searchShop(1, true)
        $('#shopModal').modal('show')
      }
    },
    openThirdPartyModal () {
      if (this.$refs.thirdPartyCompanyModal) {
        this.$refs.thirdPartyCompanyModal.searchThirdParty(1, true)
        $('#thirdPartyCompanyModal').modal('show')
      }
    },
    openDriverModal () {
      if (this.$refs.driverModal) {
        if (this.package_data && this.package_data.driver_id && this.package_data.delivery_charge) {
          this.$set(this.package_data, 'edit_deliver_charge', false)
          this.$set(this.package_data, 'edit_extra_charge', false)
          this.$refs.driverModal.setDataDeliveryCharge(this.package_data)
        } else {
          this.$refs.driverModal.setDefaultCurrency(this.currencies)
        }
        this.$refs.driverModal.searchDriver(1, true, true)
        if (this.package_data.driver) {
          this.$store.dispatch('delivery/setDriver', this.package_data.driver)
        }
      }
    },
    checkDataChange (newData, oldData) {
      return newData === oldData
    },
    cancelCn () {
      this.customer_name = this.old_cn
      this.customer_phone = this.old_cp
      this.customer_address = this.old_ca
      this.edit_cn = false
    },
    cancelShop () {
      this.$store.dispatch('package/setShop', this.old_shop)
    },
    cancelPrice () {
      this.price = this.old_price
      this.currency = this.old_currency
      this.is_paid = this.old_ip
      this.payment_type = this.old_pyt
      this.edit_price = false
    },
    cancelNote () {
      this.package_type = this.old_pt
      this.request_delivery_at = this.old_rda
      this.note = this.old_note
      this.edit_note = false
    },
    cancelThirdParty () {
      this.$store.dispatch('package/setThirdParty', this.old_third_party)
    },

    editPackage (editForm = null, editFormType = 'edit') {
      this.validate = null
      const data = new FormData()
      data.append('id', this.$route.params.id)
      data.append('edit_form', editForm)
      data.append('edit_form_type', editFormType)

      switch (editForm) {
        case 'customer_info':
          data.append('customer_name', this.customer_name)
          data.append('customer_phone', this.customer_phone)
          data.append('customer_address', this.customer_address)
          break
        case 'payment':
          data.append('price', this.price)
          data.append('is_paid', this.is_paid)
          if (this.payment_type) {
            data.append('payment_type_id', this.payment_type._id)
          }
          if (this.currency) {
            data.append('currency_id', this.currency._id)
          }
          break
        case 'remark':
          data.append('note', this.note)
          if (this.package_type) {
            data.append('package_type_id', this.package_type._id)
          }
          if (this.request_delivery_at) {
            data.append('request_delivery_at', this.$moment(this.request_delivery_at, this.show_date_format).format('YYYY-MM-DD hh:mm A'))
          }
          break
        case 'shop':
          if (this.shop) {
            data.append('shop_id', this.shop._id)
          }
          break
        case 'delivery_partner':
          if (editFormType === 'remove') {
            this.$store.dispatch('package/setThirdParty', null)
            data.append('third_party_company_id', null)
          } else if (editFormType === 'edit' && this.third_party) {
            data.append('third_party_company_id', this.third_party._id)
          }
          break
      }
      this.$axios.post(this.$base_api + '/api/backend/package/edit', data)
        .then((res) => {
          this.package_data = res.data.data
          this.resetValue()
          this.setDataPackage()
        }).catch((error) => {
          if (error.response.status === 422) {
            this.validate = error.response.data.errors
          } else {
            this.onResponseError(error)
          }
        })
    },
    removeThirdParty () {
      this.onConfirm({
        icon: 'warning',
        title: this.$t('label.remove_partner_company'),
        text: this.$t('label.remove_third_party'),
        cancelButtonColor: '#aaa',
        confirmButtonColor: '#ed524f',
        confirmButtonText: this.$t('string.ok'),
        cancelButtonText: this.$t('string.cancel')
      }).then((accept) => {
        if (accept) {
          this.editPackage('delivery_partner', 'remove')
        }
      })
    },
    resetValue () {
      this.edit_cn = false
      this.edit_cp = false
      this.edit_price = false
      this.edit_note = false
    },
    setDataPackage () {
      if (this.package_data) {
        this.customer_name = this.package_data.customer_name
        this.old_cn = this.customer_name
        this.customer_phone = this.package_data.customer_phone
        this.old_cp = this.customer_phone
        this.customer_address = this.package_data.customer_address
        this.old_ca = this.customer_address
        this.note = this.package_data.note
        this.old_note = this.note
        this.$store.dispatch('package/setShop', this.package_data.shop)
        this.old_shop = this.package_data.shop
        this.price = this.package_data.price
        this.old_price = this.price
        this.currency = this.package_data.currency
        this.old_currency = this.currency
        this.package_type = this.package_data.package_type
        this.old_pt = this.package_type
        if (this.package_data.request_delivery_at) {
          this.request_delivery_at = this.$moment(this.package_data.request_delivery_at).format(this.show_date_format)
          this.old_rda = this.request_delivery_at
        }
        this.is_paid = this.package_data.is_paid
        this.old_ip = this.is_paid
        this.payment_type = this.package_data.payment_type
        this.old_pyt = this.payment_type
        this.$store.dispatch('package/setThirdParty', this.package_data.partner_company)
        this.old_third_party = this.package_data.partner_company
        if (this.package_data.media) {
          this.preview_img = this.$base_api + '/' + this.package_data.media.src
        }
      }
    },
    getDataFromChild (value) {
      if (value) {
        this.package_data = value
        this.setDataPackage()
      }
    },
    uploadImage () {
      this.onUpload = true
      this.crop()
      setTimeout(() => {
        const data = new FormData()
        data.append('id', this.$route.params.id)
        if (this.cropped) {
          data.append('image', this.cropped)
        }
        this.$axios.post(this.$base_api + '/api/backend/package/upload-package-image', data)
          .then((res) => {
            this.package_data = res.data.data
            this.removePackageImg()
            this.resetValue()
            this.setDataPackage()
            this.$toastr('success', this.$t('string.uploadImageMessage'), this.$t('label.uploadImage'))
          }).catch((error) => {
            this.onResponseError(error)
          }).finally(() => {
            this.onUpload = false
          })
      }, 1000)
    },
    getPackageImg (event) {
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
    }
  }
}
</script>

<style scoped lang="scss">
.hide-timeline {
  max-height: 80px;
  overflow-y: hidden;
  margin-bottom: 10px;
}

.show-timeline {
  max-height: 100%;
  overflow-y: unset;
}

.package__content {
  width: 75%;
}

.package__active {
  width: 12%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;

  & button {
    margin-bottom: 8px;
  }
}

.package_form-customer-img {
  width: 65px;
  margin-right: 15px;
}

.show-with-border {
  border-bottom: 2px solid lightgray;
  padding-bottom: 8px;
}

.customer-mb-12 {
  margin-bottom: 12px;
}

.package_form-item-content-label i {
  width: 25px;
  padding-left: 2px;
}

</style>

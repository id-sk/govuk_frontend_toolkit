/* global describe it expect beforeEach afterEach spyOn */

var $ = window.jQuery

describe('GOVUK.analyticsPlugins.ecommerceSearchResults', function () {
  'use strict'
  var GOVUK = window.GOVUK

  var tracker

  beforeEach(function() {
    window.ga = function() {}
    spyOn(window, 'ga')
    tracker = new GOVUK.StaticAnalytics()
  });

  var $searchResults

  beforeEach(function () {
    $searchResults = $(
      '<div class="results-block">\
        <div class="inner-block js-live-search-results-list">\
          <div class="result-count " id="js-live-search-result-count" aria-hidden="true">\
              274 results found\
          </div>\
          <ol class="results-list" id="js-live-search-results" start="1">\
            <li>\
              <h3><a href="/cma-cases/cheesy-cheese-limited">Cheesy <mark>Cheese</mark> Limited</a></h3>\
                <ul class="attributes">\
                  <li>7 August 2009</li>\
                  <li>CMA case</li>\
                  <li><abbr title="Competition and Markets Authority">CMA</abbr></li>\
                </ul>\
              <p>OFT closed case: Acquisition by Fromage Limited of Cheesy <mark>Cheese</mark> Limited.</p>\
            </li>\
          </ol>\
        </div>\
      </div>'
    )

    $('html').on('click', function (evt) { evt.preventDefault() })
    $('body').append($searchResults)
    GOVUK.analytics = {trackEvent: function () {}}

    spyOn(GOVUK.analyticsPlugins.ecommerceSearchResults)
    GOVUK.analyticsPlugins.ecommerceSearchResults()
  })

  afterEach(function () {
    $('html').off()
    $('body').off()
    $searchResults.remove()
    delete GOVUK.analytics
  })

  describe('addImpressions', function () {
    it('listens for search results and populates ecommerce impressions', function () {

    })
  })

  describe('trackClicks', function () {
    it('listens to click events on elements within search results', function () {
      $('.results-list li h3 a').trigger('click')
      expect(GOVUK.analytics.trackEvent).toHaveBeenCalledWith(
        'Link Clicked', '/cma-cases/cheesy-cheese-limited', {transport: 'beacon'})
    })
  })
})

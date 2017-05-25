;(function (global) {
  'use strict'

  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  GOVUK.analyticsPlugins = GOVUK.analyticsPlugins || {}
  GOVUK.analyticsPlugins.ecommerceSearchResults = function () {
    var $searchResults = $('#results .results-list')

    if ($searchResults) {
      var ecommerceData = buildEcommerceData($searchResults)
      addImpressions(ecommerceData)
      trackSearchClicks($searchResults)
    }

    function buildEcommerceData ($searchResults) {
      return $searchResults.children('li').map(function (index, result) {
        var resultLink = $(result).find('h3 a')
        return {
          url: resultLink.attr('href'),
          title: resultLink.text(),
          position: index + 1
        }
      })
    }

    function addImpressions (ecommerceData) {
      if (ecommerceData.length > 0) {
        global.ga('require', 'ec')
      }

      for (var i = 0; i < ecommerceData.length; i++) {
        var searchResult = ecommerceData[i]
        global.ga('ec:addImpression', {
          id: searchResult.url,
          name: searchResult.url,
          variant: searchResult.title,
          position: i + 1,
          list: 'GOVUK_SITE_SEARCH'
        })
      }
    }

    function trackSearchClicks ($searchResults) {
      return $searchResults.children('li').map(function (index, result) {
        var $resultLink = $(result).find('h3 a')
        $resultLink.click(function (event) {
          ecommerceResultClick($resultLink, index)
        })
      })
    }

    function ecommerceResultClick ($resultLink, index) {
      global.ga('ec:addProduct', {
        'id': $resultLink.attr('href'),
        'name': $resultLink.attr('href'),
        'variant': $resultLink.text(),
        'position': index + 1
      })
      global.ga('ec:setAction', 'click', {list: 'GOVUK_SITE_SEARCH'})
      global.ga('send', 'event', 'UX', 'click', 'Results')
    }
  }

  global.GOVUK = GOVUK
})(window)

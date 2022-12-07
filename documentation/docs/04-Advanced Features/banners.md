# Banners

https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/add-banners/

There are two types of banners in this demo - Homepage banners and Search Result Page banners. Check out the existing examples on the flagship fashion index to see some examples.

How Configure it 👇

- In rules Section in the Dashboard, you have 2 'HomeBanner' rules without query conditions.
- You can edit or duplicate one of these, and personalise the different fields:
  - Images (For the background, or for the thumbnails)
  - Link or Text for the buttons
  - Titles and Subtitles
- In the code you have a condition, actually they are called together, but you can keep by type :

  - HomeBannerOne or HomeBannerTwo

- The Search Result Page banners are generally set to queries (eg 'shoes'). It'll contain:
  - type: set this to "bannersrp"
  - title
  - banner: this is an image url

You can find an example of a 'bannersrp' rule by searching for `qr-1634719042792` in `rules/example-rules.json`.

You can find an example of a 'homeBannerTwo' rule by searching for `qr-1645197289062` in `rules/example-rules.json`.

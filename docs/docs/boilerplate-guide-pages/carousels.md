---
sidebar_position: 3
---

# Configuring the Carousels

Inside `featuresConfig.js`, allow the _shouldHaveCarousels_ const to be true.
That should get the carousels showing on the homepage of the app.
![Image](./media/carousel1.png)

After this, head to `carouselConfig.js`, where you can edit the context that is being sent to the API. This will help you to control and edit what is shown on these carousels.
![Image](./media/carousel2.png)

To edit the title on the carousel, open `translation.js` where you can edit the _titleCarousels_ array to change the respective titles of your carousels.
![Image](./media/carousel3.png)

You can then head to the Algolia Dashboard to edit the rule contexts that are being sent over. This is done using the visual editor, where the Query is empty and is triggered by a context.
Then you can edit the Strategy to apply whichever pins or boosts that you like.

# color-picker
An alternative to the HTML5 color picker box.
## Demos
Basic Demo: https://kyleplo.github.io/color-picker/

Themed Demo: https://kyleplo.github.io/color-picker/themed
## Options
### Color Choices
Set `colorPickerOptions.colors` to an array of hex colors, with the #. Multiples of 7 look the best.

### Theme
Set `colorPickerOptions.theme` to an object with four colors:
- `bg`: background
- `shade`: grey color for stuff
- `accent`: color to show action, used on active buttons
- `text`: text color, should contrast with background

### Autoclose
Set `colorPickerOptions.autoclose` to a Boolean value:
- `true` (default): As soon as a color is selected, close the box
- `false`: Require the user to click "OK" to submit the color and close the box.

### Recent Colors
Set `colorPickerRecent` to an array of colors to be used as the default recent colors. Should not be more than 7 items.

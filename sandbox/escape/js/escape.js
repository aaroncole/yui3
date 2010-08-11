YUI.add('escape', function (Y) {

/**
 * Provides utility methods for escaping strings.
 *
 * @module escape
 * @class Escape
 * @static
 * @since 3.3.0
 */

var Escape = Y.Escape = {
    /**
     * Returns a copy of the specified string with special HTML characters
     * escaped. The following characters will be converted to their
     * corresponding character entities:
     * <code>&amp; &lt; &gt; &quot; &#x27; &#x2F;</code>
     *
     * @method html
     * @param {String} string String to escape
     * @return {String} Escaped string
     * @static
     */
    html: function (string) {
        // Based on the OWASP HTML escaping recommendations at
        // http://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
        return string.replace(/&/g, '&amp;').
                      replace(/</g, '&lt;').
                      replace(/>/g, '&gt;').
                      replace(/"/g, '&quot;').
                      replace(/'/g, '&#x27;').
                      replace(/\//g, '&#x2F;');
    },

    /**
     * Returns a copy of the specified string with special RegExp characters
     * escaped.
     *
     * @method regex
     * @param {String} string String to escape
     * @return {String} Escaped string
     * @static
     */
    regex: function (string) {
        return string.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, '\\$1');
    }
};

Escape.regexp = Escape.regex;

}, '@VERSION@');
// @generated by Peggy 4.0.2.
//
// https://peggyjs.org/

"use strict";


function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  // istanbul ignore next Check is a necessary evil to support older environments
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}

peg$subclass(peg$SyntaxError, Error);

function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) { return str; }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = (this.location.source && (typeof this.location.source.offset === "function"))
      ? this.location.source.offset(s)
      : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, ' ');
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = (last - s.column) || 1;
      str += "\n --> " + loc + "\n"
          + filler + " |\n"
          + offset_s.line + " | " + line + "\n"
          + filler + " | " + peg$padEnd("", s.column - 1, ' ')
          + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};

  var peg$FAILED = {};
  var peg$source = options.grammarSource;

  var peg$startRuleFunctions = { Project: peg$parseProject };
  var peg$startRuleFunction = peg$parseProject;

  var peg$c0 = "title";
  var peg$c1 = ":";
  var peg$c2 = "resource";
  var peg$c3 = "{";
  var peg$c4 = "}";
  var peg$c5 = "tags";
  var peg$c6 = "task";
  var peg$c7 = "days";
  var peg$c8 = "anyOf";
  var peg$c9 = "blockedBy";
  var peg$c10 = ">";
  var peg$c11 = "`";
  var peg$c12 = ",";
  var peg$c13 = "0";
  var peg$c14 = "//";
  var peg$c15 = "\r";
  var peg$c16 = "\n";

  var peg$r0 = /^[^`\r\n]/;
  var peg$r1 = /^[^,\r\n ]/;
  var peg$r2 = /^[1-9]/;
  var peg$r3 = /^[0-9]/;
  var peg$r4 = /^[ \t]/;
  var peg$r5 = /^[^\n]/;
  var peg$r6 = /^[ \t\r\n]/;

  var peg$e0 = peg$otherExpectation("title attribute");
  var peg$e1 = peg$literalExpectation("title", false);
  var peg$e2 = peg$literalExpectation(":", false);
  var peg$e3 = peg$literalExpectation("resource", false);
  var peg$e4 = peg$literalExpectation("{", false);
  var peg$e5 = peg$literalExpectation("}", false);
  var peg$e6 = peg$literalExpectation("tags", false);
  var peg$e7 = peg$literalExpectation("task", false);
  var peg$e8 = peg$literalExpectation("days", false);
  var peg$e9 = peg$literalExpectation("anyOf", false);
  var peg$e10 = peg$literalExpectation("blockedBy", false);
  var peg$e11 = peg$literalExpectation(">", false);
  var peg$e12 = peg$otherExpectation("a string");
  var peg$e13 = peg$literalExpectation("`", false);
  var peg$e14 = peg$classExpectation(["`", "\r", "\n"], true, false);
  var peg$e15 = peg$classExpectation([",", "\r", "\n", " "], true, false);
  var peg$e16 = peg$otherExpectation("a list of strings");
  var peg$e17 = peg$literalExpectation(",", false);
  var peg$e18 = peg$otherExpectation("an integer");
  var peg$e19 = peg$literalExpectation("0", false);
  var peg$e20 = peg$classExpectation([["1", "9"]], false, false);
  var peg$e21 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e22 = peg$otherExpectation("whitespace");
  var peg$e23 = peg$classExpectation([" ", "\t"], false, false);
  var peg$e24 = peg$literalExpectation("//", false);
  var peg$e25 = peg$classExpectation(["\n"], true, false);
  var peg$e26 = peg$classExpectation([" ", "\t", "\r", "\n"], false, false);
  var peg$e27 = peg$literalExpectation("\r", false);
  var peg$e28 = peg$literalExpectation("\n", false);

  var peg$f0 = function(title, elements) {
    return {
      title,
      resources: elements.filter(e => e.type === 'resource').map(e => e.value),
      tasks: elements.filter(e => e.type === 'task').map(e => e.value),
    };
  };
  var peg$f1 = function(type, value) { return { type, value, location: location() }; };
  var peg$f2 = function(element) { return element; };
  var peg$f3 = function(id, body) {
    return {
      type: 'resource',
      value: {
        location: location(),
        id,
        body
      }
    }
  };
  var peg$f4 = function(tags) { return { attributes: [tags] } };
  var peg$f5 = function(type, value) { return { type, value, location: location() } };
  var peg$f6 = function(id, body) {
    return {
      type: 'task',
      value: {
        id,
        body,
        location: location()
      }
    }
  };
  var peg$f7 = function(attr) { return attr; };
  var peg$f8 = function(attributes, task) { return task };
  var peg$f9 = function(attributes, tasks) {
      return { attributes, tasks }
    };
  var peg$f10 = function(type, value) { return { type, value, location: location() } };
  var peg$f11 = function(type, value) { return { type, value, location: location() } };
  var peg$f12 = function(type, value) { return { type, value, location: location() } };
  var peg$f13 = function(id, body) {
    return {
      id,
      body,
      location: location()
    }
  };
  var peg$f14 = function(characters) { return characters.join(''); };
  var peg$f15 = function(characters) { return characters.join(''); };
  var peg$f16 = function(start, el) { return el };
  var peg$f17 = function(start, elements) {
    return !elements ? [start]
      : [start, Array.isArray(elements) ? elements.flat() : elements].flat();
  };
  var peg$f18 = function() { return 0 };
  var peg$f19 = function(first, second) { return Number(first + (second ?? ''))};
  var peg$currPos = options.peg$currPos | 0;
  var peg$savedPos = peg$currPos;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = peg$currPos;
  var peg$maxFailExpected = options.peg$maxFailExpected || [];
  var peg$silentFails = options.peg$silentFails | 0;

  var peg$result;

  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p = peg$posDetailsCache.length - 1;
      } else {
        p = pos;
        while (!peg$posDetailsCache[--p]) {}
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);

    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    if (offset && peg$source && (typeof peg$source.offset === "function")) {
      res.start = peg$source.offset(res.start);
      res.end = peg$source.offset(res.end);
    }
    return res;
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseProject() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parse__();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseTitleAttribute();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse__();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parseResourceOrTask();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parseResourceOrTask();
          }
          peg$savedPos = s0;
          s0 = peg$f0(s2, s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTitleAttribute() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 5) === peg$c0) {
      s1 = peg$c0;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e1); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 58) {
        s3 = peg$c1;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e2); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        s5 = peg$parseString();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          s7 = peg$parseNL();
          if (s7 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f1(s1, s5);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e0); }
    }

    return s0;
  }

  function peg$parseResourceOrTask() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseResource();
    if (s1 === peg$FAILED) {
      s1 = peg$parseTask();
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f2(s1);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseResource() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 8) === peg$c2) {
      s1 = peg$c2;
      peg$currPos += 8;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e3); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      s3 = peg$parseString();
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        if (input.charCodeAt(peg$currPos) === 123) {
          s5 = peg$c3;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parse__();
          if (s6 !== peg$FAILED) {
            s7 = peg$parseResourceBody();
            if (s7 !== peg$FAILED) {
              s8 = peg$parse__();
              if (s8 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s9 = peg$c4;
                  peg$currPos++;
                } else {
                  s9 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$e5); }
                }
                if (s9 !== peg$FAILED) {
                  s10 = peg$parse__();
                  if (s10 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f3(s3, s7);
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseResourceBody() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseTagsAttribute();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f4(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseTagsAttribute() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c5) {
      s1 = peg$c5;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e6); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 58) {
        s3 = peg$c1;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e2); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        s5 = peg$parseStringList();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          s7 = peg$parseNL();
          if (s7 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f5(s1, s5);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTask() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c6) {
      s1 = peg$c6;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e7); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      s3 = peg$parseString();
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        if (input.charCodeAt(peg$currPos) === 123) {
          s5 = peg$c3;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parse__();
          if (s6 !== peg$FAILED) {
            s7 = peg$parseTaskBody();
            s8 = peg$parse__();
            if (s8 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s9 = peg$c4;
                peg$currPos++;
              } else {
                s9 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e5); }
              }
              if (s9 !== peg$FAILED) {
                s10 = peg$parse__();
                if (s10 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s0 = peg$f6(s3, s7);
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTaskBody() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    s3 = peg$parseTitleAttribute();
    if (s3 === peg$FAILED) {
      s3 = peg$parseDaysAttribute();
      if (s3 === peg$FAILED) {
        s3 = peg$parseAnyOfAttribute();
        if (s3 === peg$FAILED) {
          s3 = peg$parseBlockedByAttribute();
        }
      }
    }
    if (s3 !== peg$FAILED) {
      s4 = peg$parse__();
      if (s4 !== peg$FAILED) {
        peg$savedPos = s2;
        s2 = peg$f7(s3);
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$currPos;
      s3 = peg$parseTitleAttribute();
      if (s3 === peg$FAILED) {
        s3 = peg$parseDaysAttribute();
        if (s3 === peg$FAILED) {
          s3 = peg$parseAnyOfAttribute();
          if (s3 === peg$FAILED) {
            s3 = peg$parseBlockedByAttribute();
          }
        }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          peg$savedPos = s2;
          s2 = peg$f7(s3);
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    }
    s2 = [];
    s3 = peg$currPos;
    s4 = peg$parseNestedTask();
    if (s4 !== peg$FAILED) {
      s5 = peg$parse__();
      if (s5 !== peg$FAILED) {
        peg$savedPos = s3;
        s3 = peg$f8(s1, s4);
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
    } else {
      peg$currPos = s3;
      s3 = peg$FAILED;
    }
    while (s3 !== peg$FAILED) {
      s2.push(s3);
      s3 = peg$currPos;
      s4 = peg$parseNestedTask();
      if (s4 !== peg$FAILED) {
        s5 = peg$parse__();
        if (s5 !== peg$FAILED) {
          peg$savedPos = s3;
          s3 = peg$f8(s1, s4);
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
    }
    peg$savedPos = s0;
    s0 = peg$f9(s1, s2);

    return s0;
  }

  function peg$parseDaysAttribute() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c7) {
      s1 = peg$c7;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e8); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 58) {
        s3 = peg$c1;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e2); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        s5 = peg$parseInteger();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          s7 = peg$parseNL();
          if (s7 !== peg$FAILED) {
            s8 = peg$parse__();
            if (s8 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f10(s1, s5);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseAnyOfAttribute() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 5) === peg$c8) {
      s1 = peg$c8;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e9); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 58) {
        s3 = peg$c1;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e2); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        s5 = peg$parseStringList();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          s7 = peg$parseNL();
          if (s7 !== peg$FAILED) {
            s8 = peg$parse__();
            if (s8 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f11(s1, s5);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseBlockedByAttribute() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 9) === peg$c9) {
      s1 = peg$c9;
      peg$currPos += 9;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e10); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 58) {
        s3 = peg$c1;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e2); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        s5 = peg$parseStringList();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          s7 = peg$parseNL();
          if (s7 !== peg$FAILED) {
            s8 = peg$parse__();
            if (s8 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f12(s1, s5);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNestedTask() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 62) {
      s1 = peg$c10;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e11); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      s3 = peg$parseString();
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        if (input.charCodeAt(peg$currPos) === 123) {
          s5 = peg$c3;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parse__();
          if (s6 !== peg$FAILED) {
            s7 = peg$parseTaskBody();
            if (s7 !== peg$FAILED) {
              s8 = peg$parse__();
              if (s8 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s9 = peg$c4;
                  peg$currPos++;
                } else {
                  s9 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$e5); }
                }
                if (s9 !== peg$FAILED) {
                  s10 = peg$parse__();
                  if (s10 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f13(s3, s7);
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseString() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 96) {
      s1 = peg$c11;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e13); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = input.charAt(peg$currPos);
      if (peg$r0.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e14); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = input.charAt(peg$currPos);
        if (peg$r0.test(s3)) {
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e14); }
        }
      }
      if (input.charCodeAt(peg$currPos) === 96) {
        s3 = peg$c11;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e13); }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f14(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = [];
      s2 = input.charAt(peg$currPos);
      if (peg$r1.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e15); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = input.charAt(peg$currPos);
          if (peg$r1.test(s2)) {
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e15); }
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f15(s1);
      }
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e12); }
    }

    return s0;
  }

  function peg$parseStringList() {
    var s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseString();
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 44) {
        s3 = peg$c12;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e17); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        s5 = peg$parseStringList();
        if (s5 !== peg$FAILED) {
          peg$savedPos = s2;
          s2 = peg$f16(s1, s5);
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      peg$savedPos = s0;
      s0 = peg$f17(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e16); }
    }

    return s0;
  }

  function peg$parseInteger() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 48) {
      s1 = peg$c13;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e19); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f18();
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = [];
      s2 = input.charAt(peg$currPos);
      if (peg$r2.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e20); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = input.charAt(peg$currPos);
          if (peg$r2.test(s2)) {
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e20); }
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = input.charAt(peg$currPos);
        if (peg$r3.test(s3)) {
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e21); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = input.charAt(peg$currPos);
          if (peg$r3.test(s3)) {
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e21); }
          }
        }
        peg$savedPos = s0;
        s0 = peg$f19(s1, s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e18); }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r4.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e23); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = input.charAt(peg$currPos);
      if (peg$r4.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e23); }
      }
    }
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) { peg$fail(peg$e22); }

    return s0;
  }

  function peg$parse__() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c14) {
      s1 = peg$c14;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e24); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = input.charAt(peg$currPos);
      if (peg$r5.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e25); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = input.charAt(peg$currPos);
        if (peg$r5.test(s3)) {
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e25); }
        }
      }
      s3 = peg$parse__();
      if (s3 !== peg$FAILED) {
        s1 = [s1, s2, s3];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = [];
      s1 = input.charAt(peg$currPos);
      if (peg$r6.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e26); }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = input.charAt(peg$currPos);
        if (peg$r6.test(s1)) {
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e26); }
        }
      }
    }

    return s0;
  }

  function peg$parseNL() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 13) {
      s1 = peg$c15;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e27); }
    }
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (input.charCodeAt(peg$currPos) === 10) {
      s2 = peg$c16;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e28); }
    }
    if (s2 !== peg$FAILED) {
      s1 = [s1, s2];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (options.peg$library) {
    return /** @type {any} */ ({
      peg$result,
      peg$currPos,
      peg$FAILED,
      peg$maxFailExpected,
      peg$maxFailPos
    });
  }
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  StartRules: ["Project"],
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};

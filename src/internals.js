const quoteHelper = {
  unquote(expr) {
    return expr.substring (1, expr.length - 1);
  },

  quote(expr) {
    return '"' + expr + '"';
  }
}

const STDLIB = {
  /*
  TYPE CHECKING FUNCTIONS
  */
  
  islist(expr) {
    return Array.isArray(expr);
  },

  isstring(expr) {
    return (typeof expr === 'string' && expr.charAt (0) === '"' && expr.charAt (expr.length - 1) === '"');
  },

  isnumber(expr) {
    return (typeof xepr === 'number');
  },

  isboolean(expr) {
    return (typeof expr === 'boolean');
  },
    
  /*
  LIST FUNCTIONS
  */
  
  // (nth num list) -> elem
  nth(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    if(args[1] === null || args[1].length > agrs[2])
        return ["ERROR", `"'nth' on nonexisting index"`];
    else if(args[1].length === agrs[2])
        return null;
    else
        return args[1][args[2]];
  },
  
  // (prepend elem lst) -> list
  prepend(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    if(args[2] === null)
      return [args[1]];
    else
      return [args[1], ...args[2]];
  },
  
  // (append elem lst) -> list
  append(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    if(args[2] === null)
      return [args[1]];
    else
      return [...args[1], args[2]];
  },
  
  // (concat lst lst) -> lst
  concat(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return [...args[1], ...args[2]];
  },
  
  // (first lst) -> elem
  first(args) {
    if (args.length !== 2) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    if(args[1] === null || args[1].length === 0)
        return ["ERROR", `"'first' on empty list"`];
    else
        return args[1][0];
  },
  
  // (rest lst) -> list
  rest(args) {
    if (args.length !== 2) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    if(args[1] === null || args[1].length === 0)
        return ["ERROR", `"'rest' on empty list"`];
    else if(args[1].length === 1)
        return null;
    else
        return args[1].slice(1);
  },
  
  // (lstlen lst) -> num
  lstlen(args) {
    if (args.length !== 2) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    if(args[1] === null)
        return 0;
    else
      return args[1].length;
  },

  /*
  STRING FUNCTIONS
  */

  // (strlen str) -> num
  strlen(args) {
    if (args.length !== 2) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return quoteHelper.unquote(args[1]).length.toString();
  },

  // (strcat str str) -> str
  strcat(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return quoteHelper.quote("" + quoteHelper.unquote(args[1]) + quoteHelper.unquote(args[2]));
  },

  // (charat str num) -> str
  charat(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return quoteHelper.unquote(args[1]).charAt(args[2]);
  },

  // (substr str num num) -> str
  substr(args) {
    if (args.length !== 4) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return quoteHelper.quote(quoteHelper.unquote(args[1]).substring(args[2], args[3]));
  },
  
  // (strcmp str str) -> num
  strcmp(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    if (args[1] < args[2])
      return -1;
    else if (args[1] > args[2])
      return 1;
    else
      return 0;
  },

  /*
  NUMBER FUNCTIONS
  */
  
  // (add num num) -> num
  add(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return args[1] + args[2];
  },
  
  // (add num num) -> num
  sub(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return args[1] - args[2];
  },
  
  // (add num num) -> num
  mul(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return args[1] * args[2];
  },
  
  // (add num num) -> num
  div(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return args[1] / args[2];
  },
  
  // (mod num num) -> num
  mod(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return args[1] % args[2];
  },
  
  // (add num num) -> num
  pow(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return Math.pow(args[1], args[2]);
  },
  
  // (log num) -> num
  log(args) {
    if (args.length !== 2) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return Math.log(args[1]);
  },
  
  // (leq num num) -> bool
  leq(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return (args[1] <= args[2]);
  },
  
  /*
  BOOLEAN FUNCTIONS
  */
  
  // (and bool bool) -> bool
  and(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return (args[1] && args[2]);
  },

  // (or bool bool) -> bool
  or(args) {
    if (args.length !== 3) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return (args[1] || args[2]);
  },

  // (not bool) -> bool
  not(args) {
    if (args.length !== 2) return ["ERROR", "Parameters not valid: " + "'" + args[0] + "'"];
    return !args[1];
  }
};


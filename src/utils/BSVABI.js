export class BSVABI {
  constructor(abi, options = {}) {
    this.network = options.network || "mainnet";
    this.options = options;
    this.abi = abi;
    this.args = [];
    if (options.action) {
      this.action(options.action);
    }
  }
  action(actionName) {
    const action = this.abi.actions[actionName];
    if (!action) {
      throw new Error("BSVABI Error: action not found in abi schema");
    }
    this.actionName = actionName;
    this.action = action;
    return this;
  }
  fromObject(object) {
    this.args = this.action.args.map(
      (e, i) =>
        object[e.name] ||
        this.args[i] ||
        e.value ||
        e.replaceValue ||
        e.defaultValue
    );
    return this;
  }
  toArray() {
    return this.args;
  }
  toChunks() {
    return this.args.map((e) => Buffer.from(e));
  }
  contentHash(index) {
    if (!this.action.args.length) {
      return;
    }
    let arg = this.action.args[index];
    if (!arg) {
      arg = this.action.args.find((e) => e.type === "Signature");
    }
    const value = Buffer.concat(
      this.toChunks().slice(
        arg.messageStartIndex || 0,
        arg.messageEndIndex + 1 || index - 1
      )
    );
    return value;
  }
  async replace(options) {
    const replacements = Object.assign(
      {
        "#{mySignature}": async (index) => {
          if (this.options.sign) {
            return this.options.sign(this.contentHash(index));
          }
        },
        "#{myAddress}": async (index) => {
          if (this.options.address) {
            return this.options.address();
          }
        },
        "#{invoice}": async (index) => {
          if (this.options.invoice) {
            return await this.options.invoice();
          }
        }
      },
      options
    );
    for (let i in this.args) {
      const e = this.args[i];
      if (this.action.args[i].replaceValue === e) {
        const replacement = replacements[e];
        if (replacement) {
          this.args[i] = (await replacement(i)) || e;
        }
      }
    }
    return this;
  }
}

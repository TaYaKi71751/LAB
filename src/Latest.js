const { download } = require('wget-improved');
const Utilities = require('./Utilities')
class Latest extends Utilities {
  $ = require('cheerio').load;
  mirrorUrl = "https://mirrors.edge.kernel.org";
  archlinux = 'archlinux';
  iso = "iso";
  latest = "latest";

  getHrefs(response) {
    const hrefNodes = this.$(response)('[href]');
    return this.valueSlice(hrefNodes).map((hrefNode) => {
      return hrefNode.attribs['href'];
    })
  }
  getFileUrl({
    url,
    search,
    sig
  }) {
    const src = url;
    const response = this.curl({
      url: src
    });
    this.hrefs = this.getHrefs(response);
    this.bootstrapHref = this.hrefs.filter((href) => (href.includes(search)));
    return `${src}/${this.bootstrapHref[0]}`;
  }
  getBootstrap() {
    const isoLatestUrl = `${this.mirrorUrl}/${this.archlinux}/${this.iso}/${this.latest}`;
    const fileUrl = this.getFileUrl({
      url: isoLatestUrl,
      search: `bootstrap`,
      sig: false
    });
    const fileName = 'archlinux-bootstrap.tar.gz';
    let download = this.getFile({
      url: fileUrl,
      output: fileName
    });
  }
}
new Latest().getBootstrap();
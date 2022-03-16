require 'nokogiri'

def toc_data(page_content)
  html_doc = Nokogiri::HTML::DocumentFragment.parse(page_content)

  # get a flat list of headers
  headers = []
  html_doc.css('h1, h2, h3').each do |header|
    headers.push({
      id: header.attribute('id').to_s,
      content: header.children,
      title: header.children.to_s.gsub(/<[^>]*>/, ''),
      level: header.name[1].to_i,
      children: []
    })
  end

  [3,2].each do |header_level|
    header_to_nest = nil
    headers = headers.reject do |header|
      if header[:level] == header_level
        header_to_nest[:children].push header if header_to_nest
        true
      else
        header_to_nest = header if header[:level] < header_level
        false
      end
    end
  end
  headers
end

# when updating slate, this function needs to be kept safe and added back in afterwards
def modio_post_process(page_content)
  html_doc = Nokogiri::HTML::DocumentFragment.parse(page_content)

  # add colorbox class if the link contains widget
  html_doc.css('a').each do |link|
    if link.attribute('href').to_s.include? "widget"
      link['class'] = 'colorbox'
    end
  end

  # wrap HTTP endpoint method text with class for styling
  # because we need to move the HTTP method text outside of
  # the code block to wrap it we do a single regex replace.
  html_doc = html_doc.to_s.gsub(/<code>(GET|POST|PUT|DELETE)+\s{1}(.*?)<\/code>/, '<span class="httpmethod \1">\1</span> <span class="endpointheading">\2</span>')
  # version heading for the top of the docs
  html_doc = html_doc.to_s.gsub(/<h2 id="([0-9-]*)">([0-9-]*)<\/h2>/, '<h2 id="\1"><span class="versionheading">\2</span></h2>')
  # we put the hidden consent anchor on the authentication heading
  # and not the consent endpoint so when it is navigated to it
  # appears on the right line-height for the reader
  html_doc = html_doc.to_s.gsub(/(<h1\sid="authentication-2">.*<\/h1>)/, '\1<h2 id="consent" style="visibility: hidden; margin: 0; padding: 0;"></h2>')
  html_doc
end

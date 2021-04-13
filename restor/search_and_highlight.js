//��� ����� �������� ��� ����, ��������� � search_and_highlight.js
$().ready(function(){
  $('#q').keyup(function(){
    $('.search_item').each(function(){
      var re = new RegExp($('#q').val(), 'i')
      if($(this).text().match(re)){
        $(this).show();
      }else{
        $(this).hide();
      };
    });
  });
});

//��� ���� ��������, ������ ���� ��������� ������� �� ����������� � search_and_highlight.js ����� ��� ���� ����������� �� ������� keyup-keyup change � #q
<script type="text/javascript">
$(function() {
$('#q').bind('keyup change', function(ev) {
var searchTerm = $(this).val();
$('body').removeHighlight();
if ( searchTerm ) {
$('body').highlight( searchTerm );
        }
    });
});
</script>

//��� ������ �� �� �������� � ��������� �� android
function scrollToFirstFoundTerm()
{
 var firstFoundTerm = $('.highlight:first');
    if (firstFoundTerm.length > 0)
         $('html').scrollTop(firstFoundTerm.offset().top);
}

//���� - ����� ������� �� ��������� ������, ������� � ����� �������� ��� ����
jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   if (pos >= 0) {
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 });
};

jQuery.fn.removeHighlight = function() {
 function newNormalize(node) {
    for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
        var child = children[i];
        if (child.nodeType == 1) {
            newNormalize(child);
            continue;
        }
        if (child.nodeType != 3) { continue; }
        var next = child.nextSibling;
        if (next == null || next.nodeType != 3) { continue; }
        var combined_text = child.nodeValue + next.nodeValue;
        new_node = node.ownerDocument.createTextNode(combined_text);
        node.insertBefore(new_node, child);
        node.removeChild(child);
        node.removeChild(next);
        i--;
        nodeCount--;
    }
 }

 return this.find("span.highlight").each(function() {
    var thisParent = this.parentNode;
    thisParent.replaceChild(this.firstChild, this);
    newNormalize(thisParent);
 }).end();
};
<script>
    module.exports = {
        props: {
            value: {
                type: [Number,String],
                required:true
            },
            cols: {
                type: Number,
                default:6
            },
            label: {
                type:String
            },
            lookups: {
                type:Array
            },
            displayField: {
                type: String,
                required:true
            },
            valueField: {
                type: String,
                required:true
            }
        },
        template: $("#tmpSelectField").html(),
        data: function () {
            return {
                lookupValue:-1
            }
        },
        mounted: function () {
            var vm = this;
            vm.lookupValue = vm.value;
        }

    };



</script>
    
    const Field = {
        props: {
            fieldType: {
                type: String,
                default: 'text'
            },
            value: {
                type: [String, Date, Number,Boolean],
            },
            label: {
                type: String
            },
            cols: {
                type: Number
            },
            NotValid: {
                type: [Object,Boolean]
            },
            autocomplete: {
                type: String,
                default:''
            },
            
        },
        template: $("#tmpField").html(),
        data: function () {
            return {
                IsValid: true,
                ValidationMessage: ''
            }
        },
        methods: {
            telChanged: function (e) {
                var vm = this;
                var vl = $(e.target).val();
                var svl = vl.replace('(', '').replace(')', '').replace('-', '').replace(' ','');
                var res = '';
                if (svl.length < 10) {
                    res = svl;
                } else {
                    res = '(' + svl.substring(0, 3) + ') ' + svl.substring(3, 6) + '-' + svl.substring(6, 10);
                }
                vm.$emit('input', res);

            }
            
        },
        mounted: function () {
            $(".tel").keypress(function (e) {
                if (e.which < 48 || e.which > 57) {
                    e.preventDefault();
                }
            });
        }

    };

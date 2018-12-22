const SUBMODULE_TABLE_OFFSET_IN_PX = 175;
const SUBMODULE_TABLE_MIN_HEIGHT = 300;

export default {
  data() {
    return {
      tableMaxHeight: 0,
    };
  },
  created() {
    this.calculateTableHeigth();
    window.onresize = this.onWindowResize;
  },
  methods: {
    calculateTableHeigth() {
      const height = window.innerHeight - SUBMODULE_TABLE_OFFSET_IN_PX;
      this.tableMaxHeight = height < SUBMODULE_TABLE_MIN_HEIGHT ?
        SUBMODULE_TABLE_MIN_HEIGHT :
        height;
    },
    onWindowResize() {
      this.calculateTableHeigth();
      this.$refs.submodulesTable.doLayout();
    },
  },
  beforeDestroy() {
    window.onresize = null;
  },
};

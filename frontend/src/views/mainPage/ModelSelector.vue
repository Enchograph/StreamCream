<template>
  <div>
    <div class="model-dropdown">
      <!-- 一级：模型组 -->
      <select v-model="selectedGroupName" class="model-select" @change="onGroupChange">
        <option v-for="group in modelGroups" :key="group.name" :value="group.name">
          {{ group.name }}
        </option>
      </select>
  
      <!-- 二级：公共前缀（配对） -->
      <select
        v-if="selectedGroup && Object.keys(selectedGroup.pairs).length"
        v-model="selectedPairKey"
        class="model-select"
        style="margin-left: 10px;"
      >
        <option v-for="key in Object.keys(selectedGroup.pairs)" :key="key" :value="key">
          {{ key }}
        </option>
      </select>
  
      <button
        v-if="selectedPair"
        class="btn"
        style="margin-left: 10px;"
        @click="onSwitch"
      >切换模型</button>
    </div>

    <!-- 参考音频选择单独一行 -->
    <div style="margin: 10px 0; display: flex; align-items: center;">
      <label style="margin-right: 6px;">参考音频：</label>
      <select v-model="selectedAudio" :disabled="audioLoading" class="model-select">
        <option v-for="audio in audioList" :key="audio.path" :value="audio.path">
          {{ audio.file_name }}<span v-if="audio.is_current">（当前）</span>
        </option>
      </select>
      <button class="btn" style="margin-left: 10px;" @click="onSwitchAudio" :disabled="audioLoading || !selectedAudio">
        切换参考音频
      </button>
    </div>

    <!-- 模型状态显示 -->
    <div class="model-status">
      <div>当前模型pair：<b>{{ modelStatus.current_model_pair || '无' }}</b></div>
      <div>当前参考音频：<b>{{ modelStatus.current_ref_audio || '无' }}</b></div>
      <button class="btn" style="margin-top: 10px;" @click="generateSample" :disabled="sampleLoading">
        生成示例语音
      </button>
      <div v-if="sampleUrl" style="margin-top: 10px;">
        <audio :src="sampleUrl" controls></audio>
      </div>
      <div v-if="sampleLoading" style="color: #409eff; margin-top: 5px;">正在生成示例语音...</div>
      <div v-if="sampleError" style="color: red; margin-top: 5px;">{{ sampleError }}</div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { ElMessage } from 'element-plus'
  
const API_BASE = 'http://localhost:9880';
  
const modelGroups = ref([]);
const selectedGroupName = ref('');
const selectedGroup = ref(null);
const selectedPairKey = ref('');
const selectedPair = computed(() =>
  selectedGroup.value?.pairs[selectedPairKey.value] || null
);

// 参考音频相关
const audioList = ref([]);
const currentAudio = ref('');
const selectedAudio = ref('');
const audioLoading = ref(false);

// 模型状态相关
const modelStatus = ref({ current_model_pair: '', current_ref_audio: '' });
const fetchModelStatus = async () => {
  const res = await fetch(`${API_BASE}/get_current_status`);
  modelStatus.value = await res.json();
};

const fetchAudioList = async () => {
  audioLoading.value = true;
  const res = await fetch(`${API_BASE}/list_available_ref_audios`);
  const data = await res.json();
  audioList.value = data.available_audios || [];
  currentAudio.value = data.current_ref_audio || '';
  // 默认选中当前音频
  selectedAudio.value = currentAudio.value;
  audioLoading.value = false;
};

const onSwitchAudio = async () => {
  if (!selectedAudio.value) return;
  audioLoading.value = true;
  await fetch(`${API_BASE}/set_refer_audio?refer_audio_path=${encodeURIComponent(selectedAudio.value)}`);
  currentAudio.value = selectedAudio.value;
  audioLoading.value = false;
  ElMessage.success('参考音频切换成功！')
  await fetchAudioList();
  await fetchModelStatus();
};
  
onMounted(async () => {
  // 原有模型组加载
  const res = await fetch(`${API_BASE}/list_model_groups`);
  modelGroups.value = await res.json();
  if (modelGroups.value.length > 0) {
    selectedGroupName.value = modelGroups.value[0].name;
    selectedGroup.value = modelGroups.value[0];
    const keys = Object.keys(selectedGroup.value.pairs);
    if (keys.length > 0) {
      selectedPairKey.value = keys[0];
    }
  }
  // 新增：加载音频
  await fetchAudioList();
  // 新增：加载模型状态
  await fetchModelStatus();
});
  
const onGroupChange = () => {
  selectedGroup.value = modelGroups.value.find(g => g.name === selectedGroupName.value);
  const keys = Object.keys(selectedGroup.value.pairs);
  if (keys.length > 0) {
    selectedPairKey.value = keys[0];
  } else {
    selectedPairKey.value = '';
  }
};
  
const onSwitch = async () => {
  if (!selectedPair.value) {
    ElMessage.warning('请选择模型')
    return
  }
  await fetch(`${API_BASE}/set_gpt_weights?weights_path=${encodeURIComponent(selectedPair.value.gpt_path)}`);
  await fetch(`${API_BASE}/set_sovits_weights?weights_path=${encodeURIComponent(selectedPair.value.sovits_path)}`);
  ElMessage.success('模型切换成功！')
  await fetchModelStatus();
};

// 示例语音生成
const sampleUrl = ref('');
const sampleLoading = ref(false);
const sampleError = ref('');
const generateSample = async () => {
  sampleLoading.value = true;
  sampleError.value = '';
  sampleUrl.value = '';
  try {
    // 示例文本可自定义
    const params = new URLSearchParams({
      text: '你好，这是一条示例语音,早上好，中午好，下午好。',
      text_lang: 'zh',
      prompt_lang: 'ja',
      prompt_text: '',
      streaming_mode: 'false'
    });
    const res = await fetch(`${API_BASE}/tts?${params.toString()}`);
    if (!res.ok) throw new Error('生成失败');
    const blob = await res.blob();
    sampleUrl.value = URL.createObjectURL(blob);
  } catch (e) {
    sampleError.value = '生成示例语音失败';
  }
  sampleLoading.value = false;
};
</script>
  
<style scoped>
.model-dropdown {
    margin: 10px 0;
    display: flex;
    align-items: center;
}
.model-select {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    font-size: 14px;
    max-width: 200px;
    outline: none;
    cursor: pointer;
    background-color: white;
    transition: border-color 0.2s;
}
.model-select:hover {
    border-color: #c0c4cc;
}
.model-select:focus {
    border-color: #409eff;
}
.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #409eff;
    color: white;
    cursor: pointer;
    font-size: 14px;
}
.btn:hover {
    background-color: #66b1ff;
}
.model-status {
    margin-top: 18px;
    padding: 12px 16px;
    background: #f7fafd;
    border-radius: 6px;
    font-size: 15px;
    color: #333;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}
</style>